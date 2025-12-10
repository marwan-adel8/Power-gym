import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import contactImage from "../assets/imgs/contact-gym.png";

// بيانات الخدمة الخاصة بـ EmailJS
const SERVICE_ID = "service_ymee4l5";
const TEMPLATE_ID = "template_fxrqgry";
const PUBLIC_KEY = "bgvAp9O47yBoAISAK";

const ContactUs = () => {
      useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const form = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    setLoading(true);

    // التحقق من أن جميع البيانات المطلوبة متوفرة
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      await Swal.fire({
        icon: "error",
        title: "Configuration Error",
        text: "EmailJS service configuration is missing.",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
      setLoading(false);
      return;
    }

    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        form.current,
        PUBLIC_KEY
      );
      
      console.log("SUCCESS!", result.text);
      
      // عرض رسالة نجاح
      await Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "Thank you for contacting us. We'll get back to you soon!",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
      
      form.current.reset(); // تفريغ الحقول بعد الإرسال
    } catch (error) {
      console.log("FAILED...", error.text);
      
      // عرض رسالة خطأ
      await Swal.fire({
        icon: "error",
        title: "Failed to Send",
        text: "Something went wrong. Please try again later.",
        background: "#1d1d1d",
        color: "#fff",
        confirmButtonColor: "#d90a14",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-32 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "#1d1d1d",
        backgroundImage:
          "radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-7xl ">
        {/* العنوان */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] drop-shadow-lg mb-4"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            Contact Us
          </h1>
          <p className="text-gray-300 text-base md:text-lg">
            Send us your message and we will get back to you as soon as possible
          </p>
        </div>

        {/* Grid للفورم والصورة */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* الفورم - على الشمال */}
          <div data-aos="fade-right" data-aos-delay="200">
            <div className="bg-[#2a2a2a] p-8 rounded-2xl shadow-2xl border border-[#d90a14]/30">
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* حقل الاسم */}
                <div>
                  <label
                    htmlFor="user_name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    required
                    className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500"
                    placeholder="Your Name"
                  />
                </div>

                {/* حقل رقم الهاتف */}
                <div>
                  <label
                    htmlFor="user_phone"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="user_phone"
                    id="user_phone"
                    className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500"
                    placeholder="e.g., 01xxxxxxxxx"
                  />
                </div>

                {/* حقل البريد الإلكتروني */}
                <div>
                  <label
                    htmlFor="user_email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    id="user_email"
                    required
                    className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>

                {/* حقل الرسالة */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 bg-[#1d1d1d] text-white border border-gray-600 rounded-lg focus:ring-[#d90a14] focus:border-[#d90a14] transition duration-200 placeholder-gray-500 resize-none"
                    placeholder="Your message content..."
                  ></textarea>
                </div>

                {/* زر الإرسال */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3 rounded-lg text-lg font-semibold transition duration-300 ${
                    loading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-[#d90a14] hover:bg-[#ff6b00] shadow-xl shadow-[#d90a14]/50"
                  } text-white`}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          {/* الصورة - على اليمين */}
          <div data-aos="fade-left" data-aos-delay="400" className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d90a14]/30 hover:border-[#d90a14] transition-all duration-300">
              <img 
                src={contactImage} 
                alt="Contact Gym" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* تأثير الـ glow */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#d90a14] rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#ff6b00] rounded-full opacity-20 blur-3xl"></div>
          </div>
        </div>

        {/* معلومات إضافية */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div 
            className="p-4 bg-[#2a2a2a] rounded-lg border border-[#d90a14]/20 hover:border-[#d90a14]/50 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="text-[#ff6b00] text-2xl mb-2">📧</div>
            <h3 className="text-white font-semibold mb-1">Email</h3>
            <p className="text-gray-400 text-sm">info@fitmaker.com</p>
          </div>
          <div 
            className="p-4 bg-[#2a2a2a] rounded-lg border border-[#d90a14]/20 hover:border-[#d90a14]/50 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="text-[#ff6b00] text-2xl mb-2">📞</div>
            <h3 className="text-white font-semibold mb-1">Phone</h3>
            <p className="text-gray-400 text-sm">+20 123 456 7890</p>
          </div>
          <div 
            className="p-4 bg-[#2a2a2a] rounded-lg border border-[#d90a14]/20 hover:border-[#d90a14]/50 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="text-[#ff6b00] text-2xl mb-2">📍</div>
            <h3 className="text-white font-semibold mb-1">Location</h3>
            <p className="text-gray-400 text-sm">Cairo, Egypt</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
