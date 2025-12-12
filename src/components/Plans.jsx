import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa"; // استيراد أيقونات التواصل الاجتماعي
import AOS from "aos";
import "aos/dist/aos.css"; // لا تنس استيراد ملف الـ CSS
import { getCoaches } from "../services/coachService";
import { getPlans } from "../services/plansService";

// استيرادات الخدمات
import one from "../assets/imgs/waste-coach.png";
import two from "../assets/imgs/coach-2.png";
import three from "../assets/imgs/coach-gym.png";
import four from "../assets/imgs/plan-coach.png";


// استيرادات الأدوات
import caculactor from "../assets/imgs/calculator.png";
import Bmi from "../assets/imgs/Bmi.png";
import img_3 from "../assets/imgs/img-3.png";
import Goal from "../assets/imgs/goal.png";

// صور المدربين
import coach_one from "../assets/imgs/coach-one.png";

//customers 
import customerone from "../assets/imgs/customer-1.png"
import customertwo from "../assets/imgs/customer-2.png"
import customerthree from "../assets/imgs/customer-3.png"
import hambka from "../assets/imgs/hambka.jpeg"

// -------------------------------------------------------------
// البيانات
// -------------------------------------------------------------

const servicesData = [
  {
    title: "LOSING WEIGHT",
    description:
      "Achieve Sustainable Weight Loss with Our Customized Programs...",
    linkText: "Click To Join Our Losing Weight Plans",
    image: one,
  },
  {
    title: "BUILDING MUSCLE",
    description:
      "Develop Strength And Define Your Muscles With Tailored Programs...",
    linkText: "Click To Join Our Building Muscle Plans",
    image: two,
  },
  {
    title: "TRAINING IN HOME",
    description: "Stay Fit And Strong With Our Effective Home Workout Plans...",
    linkText: "Click To See Our Ultimate Home Plans",
    image: three,
  },
  {
    title: "GYM PLAN",
    description:
      "Maximize Your Gym Sessions With Structured Plans That Guide You...",
    linkText: "Click, Enter Your Details, Get Your Plan!",
    image: four,
  },
];

const toolsData = [
  { title: "CALORIE CALCULATOR", icon: caculactor, link: "#" },
  { title: "BMI CALCULATOR", icon: Bmi, link: "#" },
  { title: "MACRONUTRIENT CALCULATOR", icon: img_3, link: "#" },
  { title: "GOAL SETTING TOOL", icon: Goal, link: "#" },
  { title: "MACRONUTRIENT CALCULATOR", icon: caculactor, link: "#" },
];

// تم حذف البيانات الثابتة - سيتم جلبها من API

const testimonialsData = [
  {
    id: 1,
    name: "Ali yasser",
    role: "Our Trainer",
    image: customerone, // يرجى تحديث مسار الصورة
    review:
      "I've Been Using Fitmaker For The Past Three Months, And I'm Genuinely Impressed. The Website Is Easy To Navigate, And Everything Is Laid Out Clearly.",
  },
  {
    id: 2,
    name: "Amr Khaled",
    role: "Happy Client",
    image: customertwo, // يرجى تحديث مسار الصورة
    review:
      "Fitmaker made achieving my fitness goals effortless. The custom plans are spot on, and the support is fantastic. I've seen amazing results in just two months!",
  },
  {
    id: 3,
    name: "Hambka Elkaref",
    role: "Premium Member",
    image: hambka, // يرجى تحديث مسار الصورة
    review:
      "The personalized coaching is top-notch. It's truly a game-changer. I appreciate the detailed workout routines and the constant motivation from the team.",
  },
];
// Swiper params (دون تغيير)
const swiperParams = {
  modules: [Navigation],
  spaceBetween: 24,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
};

const trainerSwiperParams = {
  modules: [Navigation],
  spaceBetween: 24,
  slidesPerView: 1,
  navigation: {
    nextEl: ".swiper-trainer-next-custom",
    prevEl: ".swiper-trainer-prev-custom",
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
  },
};

const plansSwiperParams = {
  modules: [Navigation],
  spaceBetween: 24,
  slidesPerView: 1,
  slidesPerGroup: 1,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".swiper-plans-next-custom",
    prevEl: ".swiper-plans-prev-custom",
  },
  breakpoints: {
    640: { 
      slidesPerView: 1, 
      slidesPerGroup: 1,
      spaceBetween: 16 
    },
    768: { 
      slidesPerView: 2, 
      slidesPerGroup: 1,
      spaceBetween: 20 
    },
    1024: { 
      slidesPerView: 3, 
      slidesPerGroup: 1,
      spaceBetween: 24 
    },
  },
};


const Card = ({
  title,
  description,
  linkText,
  image,
  "data-aos": dataAos,
  "data-aos-delay": dataAosDelay,
}) => {
  const [isActive, setIsActive] = React.useState(false);

  const handleClick = () => {
    // Only toggle on mobile (screens < 1024px)
    if (window.innerWidth < 1024) {
      setIsActive(!isActive);
    }
  };

  return (
    <div
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      onClick={handleClick}
      className="group relative rounded-xl transition-all duration-300 md:hover:scale-[1.03] border border-[#d90a14]/50 p-0 overflow-hidden cursor-pointer"
      style={{
        minHeight: "300px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay العادي - شفاف تماماً */}
      <div
        className="absolute inset-0 rounded-xl transition-opacity duration-300"
        style={{
          background: "transparent",
        }}
      ></div>

      {/* المحتوى */}
      <div className={`relative h-full flex flex-col justify-between p-6 text-white z-20 opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${
        isActive ? 'opacity-100' : ''
      }`}>
        <div>
          <h3
            className="text-xl md:text-2xl font-normal mb-2 uppercase text-[#d90a14]"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            {title}
          </h3>

          <p className="text-red-300 font-medium mb-4 text-xs uppercase tracking-wider">
            {linkText}
          </p>

          <p className="text-sm text-gray-200 mb-6">{description}</p>
        </div>

        <Link
          to="/contact"
          className="flex items-center text-[#d90a14] font-semibold text-sm hover:text-[#ff6b00] mt-auto"
        >
          Learn More
          <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>

      {/* Overlay الظهور عند Hover */}
      <div
        className={`absolute inset-0 rounded-xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 ${
          isActive ? 'opacity-100' : ''
        }`}
        style={{
          background:
            "radial-gradient(circle at center, rgba(119,6,11,0.6) 0%, rgba(29,29,29,0.8) 70%, rgba(29,29,29,1) 100%)",
          zIndex: 15,
        }}
      ></div>
    </div>
  );
};

// -------------------------------------------------------------
// 🌟 TrainerCard: تم إضافة استقبال وتطبيق خصائص AOS 🌟
// -------------------------------------------------------------
const TrainerCard = ({
  name,
  role,
  image,
  link,
  socialLinks = {}, // استقبال روابط التواصل
  "data-aos": dataAos,
  "data-aos-delay": dataAosDelay,
}) => {
  // دالة مساعدة لفتح واتساب
  const handleBookSession = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const whatsappNumber = socialLinks.whatsapp || "201279905676"; // رقم افتراضي لو مش موجود
    const message = `Hello ${name}, I would like to book a session with you.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div
      // 🌟 تطبيق خصائص AOS
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      className="flex flex-col rounded-2xl transition-all duration-300 transform hover:scale-[1.03] relative overflow-hidden group cursor-pointer h-full"
      style={{
        backgroundColor: "#212121",
        boxShadow: "0 0 15px rgba(217, 10, 20, 0.1)",
      }}
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            borderRadius: "0 0 16px 16px",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black via-transparent to-transparent">
          <h3
            className="text-2xl font-bold text-white uppercase"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            {name}
          </h3>
        </div>
      </div>

      <div className="p-4 pt-2 flex flex-col flex-grow">
        <p className="text-sm font-medium text-[#ff6b00] uppercase tracking-wider mb-4">
          {role}
        </p>

        {/* Social Icons */}
        <div className="flex space-x-4 mb-6">
          {socialLinks.facebook && (
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D90A14] transition-colors">
              <FaFacebook size={20} />
            </a>
          )}
          {socialLinks.instagram && (
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D90A14] transition-colors">
              <FaInstagram size={20} />
            </a>
          )}
          {socialLinks.twitter && (
            <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D90A14] transition-colors">
              <FaTwitter size={20} />
            </a>
          )}
          {socialLinks.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D90A14] transition-colors">
              <FaLinkedin size={20} />
            </a>
          )}
        </div>

        <div className="mt-auto">
            <button 
                onClick={handleBookSession}
                className="w-full py-2 rounded-lg bg-[#D90A14] hover:bg-[#ff6b00] text-white font-semibold uppercase transition duration-300 flex items-center justify-center gap-2"
            >
                <FaWhatsapp size={18} />
                Book a Session
            </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 🌟 ToolCard: تم إضافة استقبال وتطبيق خصائص AOS 🌟
// -------------------------------------------------------------
const ToolCard = ({
  icon,
  link,
  "data-aos": dataAos,
  "data-aos-delay": dataAosDelay,
}) => {
  return (
    <a
      href={link}
      // 🌟 تطبيق خصائص AOS
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      className="flex flex-col rounded-2xl border border-gray-800 transition-all duration-300 transform hover:scale-[1.03] active:scale-[1.03] shadow-2xl relative overflow-hidden group cursor-pointer"
      style={{
        boxShadow: "0 0 15px rgba(217, 10, 20, 0.1)",
        minHeight: "280px",
        backgroundColor: "#1c1c1c",
        textDecoration: "none",
      }}
    >
      {/* ... (باقي محتوى ToolCard) ... */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundImage: `url(${icon})` }}
      ></div>
      <div
        className="absolute inset-0 rounded-2xl"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 100%)",
        }}
      ></div>
      <div className="relative z-10 flex flex-col justify-end flex-grow p-4">
        <span
          className="text-sm font-medium text-[#D90A14] group-hover:text-[#ff6b00] transition duration-300 flex items-center justify-start mt-auto"
          style={{ filter: "drop-shadow(0 0 5px #D90A14)" }}
        >
          Learn More <span className="ml-2">→</span>
        </span>
      </div>
    </a>
  );
};

const PlanCard = ({
  planId,
  title,
  price,
  discountedPrice,
  description,
  features,
  isFeatured = false,
  "data-aos": dataAos,
  "data-aos-delay": dataAosDelay,
}) => {
  const navigate = useNavigate();
  const featureIcon = isFeatured ? "text-[#D90A14]" : "text-[#ff6b00]";
  const borderColor = isFeatured ? "border-[#D90A14]" : "border-[#ff6b00]";
  const buttonColor = isFeatured
    ? "bg-[#D90A14] hover:bg-[#ff6b00]"
    : "bg-[#ff6b00] hover:bg-[#D90A14]";

  const handleChoosePlan = () => {
    if (planId) {
      navigate(`/subscribe/${planId}`);
    }
  };

  return (
    <div
      data-aos={dataAos}
      data-aos-delay={dataAosDelay}
      className={`flex flex-col p-4 md:p-6 rounded-2xl border-4 ${borderColor} transition-all duration-300 transform hover:scale-[1.03] shadow-2xl h-full`}
      style={{
        backgroundColor: "transparent",
        boxShadow: isFeatured
          ? "0 0 40px rgba(217, 10, 20, 0.6)"
          : "0 0 20px rgba(255, 107, 0, 0.4)",
        minHeight: "500px",
      }}
    >
      {/* ... (باقي محتوى PlanCard) ... */}
      <div className="text-center mb-4 md:mb-6">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">
          Package
        </p>
        <h3
          className="text-2xl md:text-3xl font-bold uppercase text-white"
          style={{ fontFamily: "Gagalin, sans-serif" }}
        >
          {title}
        </h3>
      </div>
      <div className="mb-4 md:mb-6 h-auto md:h-20">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">
          Description
        </p>
        <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
      </div>
      <div className="flex-grow mt-3 md:mt-5 mb-6 md:mb-8">
        <p className="text-xs uppercase tracking-widest text-gray-400 mb-3">
          Features
        </p>
        <ul className="space-y-2 text-sm text-gray-200">
          {features && features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <span className={`text-lg mr-2 ${featureIcon}`}>✔</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="text-center mb-4 md:mb-6">
        <div className="flex items-baseline justify-center">
          <span className="text-4xl md:text-5xl font-extrabold text-white">
            {discountedPrice || price}
          </span>
          {discountedPrice && (
            <span className="text-xl md:text-2xl text-gray-500 line-through ml-2">
              {price}
            </span>
          )}
          <span className="text-lg md:text-xl font-normal text-gray-400 align-top ml-1">
            USDT
          </span>
        </div>
      </div>
      <button
        onClick={handleChoosePlan}
        className={`w-full py-2.5 md:py-3 rounded-lg text-white font-semibold uppercase transition duration-300 ${buttonColor}`}
      >
        Choose This Plan
      </button>
    </div>
  );
};

const TestimonialThumbnail = ({
  name,
  image,
  isActive,
  onClick,
  thumbnailHeight,
}) => {
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <div
      onClick={onClick}
      className={`w-24 rounded-md overflow-hidden relative cursor-pointer transition-all duration-300 group
                ${isActive ? "ring-4 ring-[#ff6b00]" : ""}`}
      style={{
        backgroundColor: "transparent",
        height: thumbnailHeight,
        flexShrink: 0,
      }}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover absolute inset-0 transition-transform duration-300 group-hover:scale-105"
      />

      {/* Name - أفقي وعلى سطرين */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center z-10">
        <p
          className={`text-sm font-semibold uppercase tracking-wider text-white`}
          style={{
            textShadow: "0 0 5px rgba(0,0,0,0.8)",
          }}
        >
          <span
            style={{
              color: isActive ? "#ff6b00" : "white",
              display: "block",
            }}
          >
            {firstName}
          </span>
          <span
            style={{
              color: "white",
              display: "block",
            }}
          >
            {lastName}
          </span>
        </p>
      </div>
    </div>
  );
};



const Plans = () => {
  const [trainersData, setTrainersData] = useState([]);
  const [loadingTrainers, setLoadingTrainers] = useState(true);
  const [plansData, setPlansData] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    // تهيئة AOS
    AOS.init({
      duration: 1200,
      once: true,
      mirror: false,
    });
    // تحديث AOS للتأكد من حساب موضع العناصر
    AOS.refresh();
  }, []);

  // جلب بيانات المدربين من API
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        setLoadingTrainers(true);
        const coaches = await getCoaches();
        // تحويل البيانات من API إلى الشكل المطلوب
        const formattedTrainers = coaches.map((coach) => ({
          name: coach.name,
          role: coach.specialty || "Personal Trainer",
          image: coach.image || coach_one, // استخدام الصورة من API أو الصورة الافتراضية
          link: "#",
          socialLinks: coach.socialLinks || {}, // تمرير روابط التواصل الاجتماعي
        }));
        setTrainersData(formattedTrainers);
      } catch (error) {
        console.error("Error fetching coaches:", error);
        // في حالة الخطأ، نستخدم بيانات افتراضية فارغة
        setTrainersData([]);
      } finally {
        setLoadingTrainers(false);
      }
    };

    fetchTrainers();
  }, []);

  // جلب بيانات الخطط من API
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoadingPlans(true);
        const plans = await getPlans();
        setPlansData(plans);
      } catch (error) {
        console.error("Error fetching plans:", error);
        setPlansData([]);
      } finally {
        setLoadingPlans(false);
      }
    };

    fetchPlans();
  }, []);

  const [activeTestimonialId, setActiveTestimonialId] = React.useState(1);
  const activeTestimonial = testimonialsData.find(
    (t) => t.id === activeTestimonialId
  );
  const inactiveTestimonials = testimonialsData.filter(
    (t) => t.id !== activeTestimonialId
  );
  const [reviewBoxHeight, setReviewBoxHeight] = React.useState("350px");

  const handleThumbnailClick = (id) => {
    setActiveTestimonialId(id);
  };

  const navigateTestimonials = (direction) => {
    const currentIndex = testimonialsData.findIndex(
      (t) => t.id === activeTestimonialId
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % testimonialsData.length;
    } else {
      // prev
      newIndex =
        (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
    }
    setActiveTestimonialId(testimonialsData[newIndex].id);
  };

  const reviewBoxRef = React.useRef(null);
  const activeImageRef = React.useRef(null);

  React.useEffect(() => {
    if (reviewBoxRef.current && activeImageRef.current) {
      const calculatedHeight = reviewBoxRef.current.offsetHeight;

      // 1. تحديث ارتفاع الصورة النشطة (Steven)
      activeImageRef.current.style.height = `${calculatedHeight}px`;

      // 2. تحديث الحالة لاستخدامها في المصغرات (Josh & Edward)
      setReviewBoxHeight(`${calculatedHeight}px`);
    }
  }, [activeTestimonialId, activeTestimonial]);


  return (
    <section
      className="pt-20 pb-0 px-4 sm:px-6 lg:px-8 relative min-h-screen"
      style={{
        backgroundColor: "#1d1d1d",
        backgroundImage:
          "radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 200px 150px -100px #212121",
      }}
    >
      <div className="container mx-auto max-w-7xl">
        {/* 🌟🌟🌟 4. Our Services Section (القسم الجديد المدمج) 🌟🌟🌟 */}
        <div className="py-20 px-4 sm:px-6 lg:px-8 relative" data-aos="fade-up">
          <div className="container mx-auto max-w-6xl">
            {/* Title - تم تطبيق تنسيق Gagalin والـ Gradient */}
            <div className="text-center mb-12">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] drop-shadow-lg"
                style={{ fontFamily: "Gagalin, sans-serif" }}
              >
                Our Services
              </h2>
              <p className="text-gray-300 mt-3 text-sm sm:text-base">
                At this part you can easily access all of our services.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {servicesData.map((service, index) => (
                <Card
                  key={index}
                  {...service}
                  data-aos="fade-up"
                  data-aos-delay={index * 150} // تأخير (150ms * index)
                />
              ))}
            </div>
          </div>
        </div>
        {/* 🌟🌟🌟 نهاية قسم Services 🌟🌟🌟 */}

        {/* start Plans */}
        <div id="plans" className="pt-16">
          <div className="relative">
            <div
              className="flex flex-row justify-between items-center mb-6 md:mb-10 md:block md:text-center"
              data-aos="fade-up"
            >
              {/* Mobile Layout: Title on left, buttons on right */}
              <h2
                className="text-2xl sm:text-4xl md:text-6xl font-normal uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] drop-shadow-lg text-left md:text-center"
                style={{ fontFamily: "Gagalin, sans-serif" }}
              >
                Our Plans
              </h2>

              {/* Description - Hidden on mobile, shown on desktop */}
              <p className="hidden md:block text-gray-300 mt-3 text-sm sm:text-base mb-8">
                Select The Plan That Suits Your Fitness Goals And Let Our Expert
                Coaches Guide You Every Step Of The Way.
              </p>

              {/* Monthly/Annually Toggle - Hidden on mobile, shown on desktop */}
              <div className="hidden md:inline-flex rounded-full p-1 border border-gray-600 bg-[#333333] mb-8">
                <button className="px-6 py-2 text-sm font-medium rounded-full bg-[#D90A14] text-white transition duration-300">
                  Monthly
                </button>
                <button className="px-6 py-2 text-sm font-medium rounded-full text-gray-400 hover:text-white transition duration-300">
                  Annually
                </button>
              </div>

              {/* Mobile Navigation Buttons - On the right side */}
              <div className="flex md:hidden space-x-3 z-10">
                <div className="swiper-plans-prev-custom w-8 h-8 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
                <div className="swiper-plans-next-custom w-8 h-8 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="relative mb-24 px-2">
              {loadingPlans ? (
                <div className="text-center text-white py-12">
                  Loading plans...
                </div>
              ) : plansData.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                  No plans available
                </div>
              ) : (
                <div className="overflow-hidden">
                  <Swiper {...plansSwiperParams} className="!overflow-hidden">
                    {plansData.map((plan, index) => (
                      <SwiperSlide key={plan._id || index} className="!h-auto pb-10">
                        <PlanCard
                          planId={plan._id}
                          title={plan.name}
                          price={plan.price}
                          discountedPrice={plan.discountedPrice}
                          description={plan.description}
                          features={plan.features}
                          isFeatured={index === 1} // Make middle plan featured
                          data-aos="fade-up"
                          data-aos-delay={index * 100}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              )}

              {/* أزرار التنقل للديسكتوب */}
              <div className="hidden md:flex absolute top-0 right-0 transform -translate-y-[150%] space-x-3 z-10">
                <div className="swiper-plans-prev-custom w-10 h-10 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
                <div className="swiper-plans-next-custom w-10 h-10 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Plans */}

        {/* 2. Fitness Tools Section */}
        <div className="pt-16">
          <div className="relative">
            <div className="flex flex-row justify-between items-end mb-6 md:mb-10 md:block md:text-center" data-aos="fade-up">
              {" "}
              {/* تطبيق AOS على عنوان الأدوات */}
              <h2
                className="text-2xl sm:text-5xl font-normal uppercase tracking-widest text-white drop-shadow-lg text-left md:text-center"
                style={{ fontFamily: "Gagalin, sans-serif" }}
              >
                Our Fitness <span className="text-[#ff6b00]">Tools</span>
              </h2>
              <p className="hidden md:block text-gray-300 mt-2 text-sm sm:text-base">
                Access A Variety Of Tools To Help You Reach Your Fitness Goals
                More Effectively
              </p>

              {/* Mobile Buttons - تظهر بجانب العنوان على الموبايل فقط */}
              <div className="flex md:hidden space-x-3 z-10 mb-1">
                <div className="swiper-button-prev-custom w-8 h-8 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
                <div className="swiper-button-next-custom w-8 h-8 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="relative">
              <Swiper {...swiperParams}>
                {toolsData.map((tool, index) => (
                  <SwiperSlide key={index} className="pb-10">
                    {/* 🌟 تمرير خصائص AOS لـ ToolCard 🌟 */}
                    <ToolCard
                      icon={tool.icon}
                      link={tool.link}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* ... (أزرار التنقل للديسكتوب) ... */}
              <div className="hidden md:flex absolute top-0 right-0 transform -translate-y-[150%] space-x-3 z-10">
                <div className="swiper-button-prev-custom w-10 h-10 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
                <div className="swiper-button-next-custom w-10 h-10 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Fitness Tools */}

        {/* 3. Trainers Section */}
        <div id="trainers" className="pt-24 pb-16">
          <div className="relative">
            {/* Header Trainers */}
            <div className="flex flex-row justify-between items-end mb-6 md:mb-10 md:block md:text-center" data-aos="fade-up">
              {" "}
              {/* تطبيق AOS على عنوان المدربين */}
              <h2
                className="text-2xl sm:text-5xl font-normal uppercase tracking-widest text-white drop-shadow-lg text-left md:text-center"
                style={{ fontFamily: "Gagalin, sans-serif" }}
              >
                Meet Our <span className="text-[#ff6b00]">Trainers</span>
              </h2>
              <p className="hidden md:block text-gray-300 mt-2 text-sm sm:text-base max-w-xl mx-auto">
                Discover The Dedicated Professionals Ready To Guide Your Fitness
                Journey.
              </p>

              {/* Mobile Buttons - تظهر بجانب العنوان على الموبايل فقط */}
              <div className="flex md:hidden space-x-3 z-10 mb-1">
                <div className="swiper-trainer-prev-custom w-8 h-8 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
                <div className="swiper-trainer-next-custom w-8 h-8 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Trainer Cards Swiper */}
            <div className="relative">
              {loadingTrainers ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">Loading trainers...</p>
                </div>
              ) : trainersData.length > 0 ? (
                <Swiper {...trainerSwiperParams}>
                  {trainersData.map((trainer, index) => (
                    <SwiperSlide key={index} className="pb-10">
                      {/* 🌟 تمرير خصائص AOS لـ TrainerCard 🌟 */}
                      <TrainerCard
                        {...trainer}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-400">No trainers available</p>
                </div>
              )}

              {/* أزرار التنقل المخصصة لـ Trainers - Desktop Only */}
              <div className="hidden md:flex absolute top-0 right-0 transform -translate-y-[150%] space-x-3 z-10">
                <div className="swiper-trainer-prev-custom w-10 h-10 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                    />
                  </svg>
                </div>
                <div className="swiper-trainer-next-custom w-10 h-10 rounded-lg border border-white text-white flex items-center justify-center cursor-pointer bg-transparent hover:bg-white hover:text-gray-900 transition duration-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Trainers Section */}

        {/* 4. Customer Testimonials Section (بالـ AOS وتأثيرات الـ Hover) */}
        <div id="testimonials" className="pt-16 pb-0  relative">
          <div className="container mx-auto max-w-7xl">
            {/* Header - What Our Customers Say */}
            <div className="text-center mb-16" data-aos="fade-up">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-widest text-white drop-shadow-lg"
                style={{ fontFamily: "Gagalin, sans-serif" }}
              >
                WHAT OUR{" "}
                <span className="text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] drop-shadow-lg">
                  CUSTOMERS
                </span>{" "}
                SAY
              </h2>
              <p className="text-gray-300 mt-3 text-sm sm:text-base max-w-xl mx-auto">
                At This Part You Can See Few Of The Many Positive Reviews Of Our
                Customers.
              </p>
            </div>

            {/* Testimonials Display Area - AOS الشامل */}
            <div
              className="flex justify-center w-full relative md:min-h-[450px]"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              {activeTestimonial && (
                <div
                  key={activeTestimonial.id}
                  className="flex flex-col md:flex-row items-center md:items-start w-full relative max-w-[1100px]"
                >
                  {/* 1. Active Customer Image (Steven Haward) - Hidden on Mobile */}
                  <div
                    ref={activeImageRef}
                    className="hidden md:block flex-shrink-0 w-64 relative mr-12 group"
                  >
                    <img
                      src={activeTestimonial.image}
                      alt={activeTestimonial.name}
                      className="w-full h-full object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                      style={{
                        transition: "transform 0.3s",
                      }}
                    />
                  </div>

                  {/* 2. Review Box and Arrows */}
                  <div className="flex-grow flex flex-col relative w-full md:w-auto">
                    {/* Review Box */}
                    <div
                      ref={reviewBoxRef}
                      className="p-6 pb-20 md:p-8 rounded-xl relative flex-grow w-full md:min-h-[280px]"
                      style={{
                        backgroundColor: "#5B0408",
                        maxWidth: "100%", // Full width on mobile, constrained by flex on desktop
                      }}
                    >
                      {/* Quote Icon */}
                      <span className="absolute top-4 right-6 text-5xl md:text-7xl text-[#d90a14] font-serif leading-none">
                        &ldquo;
                      </span>

                      <h3
                        className="text-xl font-bold text-white mb-0.5 uppercase"
                        style={{ fontFamily: "Gagalin, sans-serif" }}
                      >
                        {activeTestimonial.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-300 uppercase tracking-wider mb-4">
                        {activeTestimonial.role}
                      </p>

                      <p className="text-gray-200 text-sm md:text-base leading-relaxed italic pr-4">
                        {activeTestimonial.review}
                      </p>

                      {/* أزرار التنقل (في الأسفل) */}
                      <div className="absolute bottom-4 right-4 flex space-x-3 mt-4">
                        <div
                          onClick={() => navigateTestimonials("prev")}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-600 text-white flex items-center justify-center cursor-pointer bg-black/50 hover:bg-[#d90a14] hover:border-[#d90a14] transition duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 md:w-5 md:h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                            />
                          </svg>
                        </div>
                        <div
                          onClick={() => navigateTestimonials("next")}
                          className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white text-white flex items-center justify-center cursor-pointer bg-black/50 hover:bg-[#d90a14] hover:border-[#d90a14] transition duration-300"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4 md:w-5 md:h-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3. Inactive Thumbnails (Josh & Edward) - Hidden on Mobile */}
                  <div className="hidden md:flex flex-row space-x-2 ml-8 items-start">
                    {inactiveTestimonials.map((t, index) => (
                      <TestimonialThumbnail
                        key={t.id}
                        name={t.name}
                        image={t.image}
                        isActive={false}
                        onClick={() => handleThumbnailClick(t.id)}
                        thumbnailHeight={reviewBoxHeight}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* End Customer Testimonials Section */}
      </div>
    </section>
  );
};

export default Plans;
