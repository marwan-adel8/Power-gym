import React from "react";

// تأكد من أن هذه المسارات صحيحة
import one from "../assets/imgs/waste-coach.png";
import two from "../assets/imgs/coach-2.png";
import three from "../assets/imgs/coach-gym.png";
import four from "../assets/imgs/plan-coach.png";

const Services = () => {
  const services = [
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
      description:
        "Stay Fit And Strong With Our Effective Home Workout Plans...",
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

  return (
    <section
      className="py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundColor: "#1d1d1d",
        backgroundImage: `radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        boxShadow: "inset 0 200px 150px -100px #212121",
      }}
    >
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
          {services.map((service, index) => (
            <Card key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};
const Card = ({ title, description, linkText, image }) => (
  <div
    className="group relative rounded-xl transition-all duration-300 hover:scale-[1.03] border border-[#d90a14]/50 p-0 overflow-hidden"
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
    <div className="relative h-full flex flex-col justify-between p-6 text-white z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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

        <p className="text-sm text-gray-200 mb-6">
          {description}
        </p>
      </div>

      <a
        href="#"
        className="flex items-center text-[#d90a14] font-semibold text-sm hover:text-[#ff6b00] mt-auto"
      >
        Learn More
        <span className="ml-2 text-xl transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      </a>
    </div>

    {/* Overlay الظهور عند Hover */}
    <div
      className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle at center, rgba(119,6,11,0.6) 0%, rgba(29,29,29,0.8) 70%, rgba(29,29,29,1) 100%)",
        zIndex: 15,
      }}
    ></div>
  </div>
);



export default Services;
