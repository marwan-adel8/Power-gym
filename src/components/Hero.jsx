import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Heroimg from "../assets/imgs/Group 2.png";
import Elipse from "../assets/imgs/Ellipse 10.png";
import Elipse2 from "../assets/imgs/Ellipse 11.png";
import "../App.css";
import { motion } from "framer-motion";



const statsData = [
  {
    value: "96%",
    label: "Client Satisfaction",
    sub: "Our Members Love Their Results And Experience",
  },
  {
    value: "+5",
    label: "Years Of Experience",
    sub: "Trust In Our Proven Track Record Of Transforming",
  },
  {
    value: "+800",
    label: "Active Members",
    sub: "Join Our Thriving Fitness Community",
  },
  {
    value: "24/7",
    label: "Support Available",
    sub: "Expert Assistance Whenever You Need It",
  },
];

// 💥 المكون الجديد مع تأثير العد 💥
const CountingStatItem = ({ value, label, sub, duration = 2000 }) => {
    // نستخدم React.useMemo لتجنب إعادة حساب القيمة في كل مرة
    const numericValue = React.useMemo(() => parseInt(value.replace(/[^0-9]/g, '')), [value]);
    
    const [currentValue, setCurrentValue] = React.useState(0);

    React.useEffect(() => {
        let start = 0;
        const incrementTime = 50; // تحديث كل 50 ملي ثانية
        const totalSteps = duration / incrementTime;
        
        // حساب قيمة الزيادة لكل خطوة (بناءً على الخطوات الكلية)
        const incrementAmount = Math.ceil(numericValue / totalSteps);

        const timer = setInterval(() => {
            start += incrementAmount;
            if (start >= numericValue) {
                setCurrentValue(numericValue);
                clearInterval(timer);
            } else {
                setCurrentValue(start);
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [numericValue, duration]);

    // تنسيق القيمة مع الحفاظ على الرموز (+، %)
    let displayValue = currentValue.toLocaleString();
    if (value.includes('+')) {
        displayValue = `+${displayValue}`;
    }
    if (value.includes('%')) {
        displayValue = `${displayValue}%`;
    }
    // معالجة حالة 24/7 التي ليست رقماً مباشراً
    if (value === "24/7") {
         displayValue = value; // إظهارها مباشرة
    }


    return (
        <div className="flex-shrink-0 w-1/4 min-w-[300px] text-center px-8 py-4 border-l border-[#d90a14]/50">
            <p className="text-4xl md:text-5xl font-extrabold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] font-vazirmatn">
                {displayValue}
            </p>
            <p className="text-lg font-semibold text-gray-100 mb-1 font-vazirmatn">
                {label}
            </p>
            <p className="text-xs text-gray-400 font-vazirmatn">{sub}</p>
        </div>
    );
};


const ScrollingStatsBanner = () => {
  const content = [...statsData, ...statsData];

  return (
    <div className="overflow-hidden py-6 bg-[#212121]">
      <div className="flex w-fit animation-scroll">
        {content.map((stat, index) => (
          // 💥 استخدام CountingStatItem هنا 💥
          <CountingStatItem key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

const StatBox = ({ value, label, position, delay = 0 }) => (
  <div
    className="absolute z-[3] bg-[#2a2a2a] text-white p-3 md:p-4 rounded-[20px] md:rounded-[30px] shadow-2xl border border-[#d90a14] w-[100px] md:w-[150px] text-center floating font-vazirmatn"
    style={{ ...position, animationDelay: `${delay}s` }}
  >
    <p className="text-sm md:text-xl font-extrabold text-[#d90a14] font-vazirmatn">
      {value}
    </p>
    <p className="text-[10px] md:text-xs text-gray-300 mt-1 font-vazirmatn whitespace-nowrap">{label}</p>
  </div>
);

const Hero = () => {
  const customStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700;800;900&display=swap');
    .font-vazirmatn { font-family: 'Vazirmatn', sans-serif !important; }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
    .animation-scroll { animation: marquee 40s linear infinite; }
    @keyframes float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-8px) rotate(0.5deg); } 100% { transform: translateY(0px) rotate(0deg); } }
    .floating { animation: float 4s ease-in-out infinite; }
  `;

  return (
    <div className="text-white bg-[#1d1d1d] bg-fixed bg-no-repeat bg-cover relative overflow-hidden font-vazirmatn">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 50%, #77060b4d 0%, rgba(29,29,29,0) 60%)," +
            "linear-gradient(to bottom, #1d1d1d 0%, transparent 50%, #1d1d1d 100%)," +
            "linear-gradient(to right, #712b0d 0%, transparent 10%, transparent 90%, #77060b 100%)",
        }}
      ></div>

      <div className="relative grid grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-6 md:px-10 py-12 md:py-24 gap-8 md:gap-12 items-center min-h-screen">
        <div className="max-w-[600px] z-10 text-center mx-auto order-2 md:order-1">
          <h1 className="text-3xl md:text-5xl leading-tight mb-2 font-bold">
            Achieve Your
          </h1>
          <span
            className="text-5xl md:text-8xl font-normal bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] drop-shadow-lg block md:whitespace-nowrap"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            FITNESS GOALS
          </span>
          <h1 className="text-3xl md:text-5xl leading-tight mt-4 md:mt-[30px] font-bold">
            With FitMaker
          </h1>
          <p
            className="hidden md:block text-base leading-7 mb-10 max-w-[480px] md:max-w-[600px] text-left text-gray-200 mx-auto"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            Join the Fitmaker community and transform your fitness journey. Our
            expert coaches and personalized programs are designed to help you
            achieve your goals and exceed your expectations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-6 md:mt-0">
            <Link to="/contact">
              <motion.div
                className="bg-[#d90a14] font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg shadow-xl shadow-[#d90a14]/50 cursor-pointer"
                whileHover={{ scale: 1.1, rotate: 2 }}
                transition={{ duration: 0.3 }}
              >
                Start Your Journey
              </motion.div>
            </Link>

            <motion.a
              href="#plans"
              className="border border-[#712b0d] text-gray-300 font-bold px-6 md:px-8 py-3 md:py-4 rounded-lg text-base md:text-lg"
              whileHover={{ scale: 1.1, rotate: 2 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#plans')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Programs
            </motion.a>
          </div>
        </div>

        <div className="relative flex justify-center items-center w-full min-h-[400px] md:min-h-[500px] order-1 md:order-2">
          <StatBox
            value="+ 80"
            label="Coaches"
            position={{ top: "25%", left: "0%" }}
            delay={0.5}
          />
          <StatBox
            value="+ 1300"
            label="Positive Reviews"
            position={{ top: "0%", right: "5%" }}
            delay={0.1}
          />
          <StatBox
            value="+ 1000"
            label="Workout Videos"
            position={{ bottom: "5%", left: "10%" }}
            delay={0.8}
          />
          <StatBox
            value="+ 1500"
            label="Trainers"
            position={{ bottom: "20%", right: "0%" }}
            delay={0.3}
          />

          <div
            className="absolute z-[1]"
            style={{
              top: "10px",
              left: "14%",
              transform: "translate(-50%, -50%) scale(0.9)",
              width: "120px",
              height: "120px",
              backgroundImage: `url(${Elipse})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <div
            className="absolute z-0"
            style={{
              top: "490px",
              left: "85%",
              transform: "translate(-50%, -50%) scale(1.1)",
              width: "120px",
              height: "120px",
              backgroundImage: `url(${Elipse2})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
          <img
            src={Heroimg}
            className="absolute z-[2] max-w-[90%] md:max-w-[90%]"
            style={{
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              height: "auto",
              maxHeight: "500px",
            }}
            alt="Athlete holding dumbbell"
          />
        </div>
      </div>

      <ScrollingStatsBanner />
    </div>
  );
};

export default Hero;