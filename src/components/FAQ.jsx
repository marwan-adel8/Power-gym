import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: 1,
    question: "What Is FitMaker And How Can It Help Me Reach My Fitness Goals?",
    answer: "FitMaker Is An Online Fitness Platform That Offers Personalized Workout Plans, Expert Coaching, And Comprehensive Nutritional Guidance. Whether You're Looking To Lose Weight, Build Muscle, Or Simply Stay Fit, Our Tailored Programs And Community Support Will Help You Achieve Your Fitness Goals."
  },
  {
    id: 2,
    question: "How Do I Get Started With A Workout Plan On FitMaker?",
    answer: "Getting started is easy! Simply sign up for an account, choose a plan that fits your goals, and our expert coaches will guide you through personalized workout routines tailored to your fitness level and objectives."
  },
  {
    id: 3,
    question: "What Is Included In The Custom Plan?",
    answer: "Our custom plans include personalized workout routines, nutrition guidance, progress tracking tools, and direct access to certified trainers who will support you throughout your fitness journey."
  },
  {
    id: 4,
    question: "Can I Change My Plan After Signing Up?",
    answer: "Yes! You can upgrade or modify your plan at any time. Our flexible subscription options allow you to adjust your plan based on your evolving fitness needs and goals."
  },
  {
    id: 5,
    question: "What Kind Of Support Can I Expect From My Trainer?",
    answer: "Our certified trainers provide ongoing support including workout guidance, form corrections, motivation, and personalized advice. You can communicate with them through our platform and even book one-on-one sessions via WhatsApp."
  }
];

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div 
      className="border border-[#d90a14]/50 rounded-lg mb-4 overflow-hidden transition-all duration-300 hover:border-[#d90a14]"
      style={{ backgroundColor: "#2a2a2a" }}
    >
      <button
        onClick={onClick}
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none group"
      >
        <h3 className="text-base md:text-lg font-semibold text-white pr-4">
          {question}
        </h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <svg
            className="w-6 h-6 text-[#d90a14] group-hover:text-[#ff6b00] transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4 pt-2 text-gray-300 text-sm md:text-base leading-relaxed border-t border-[#d90a14]/30">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const [openId, setOpenId] = useState(1); // First FAQ open by default

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 
            className="text-4xl sm:text-5xl md:text-6xl font-normal uppercase tracking-widest text-white drop-shadow-lg mb-4"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            FAQ
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Find Answers To Common Questions About FitMaker
          </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100">
          {faqData.map((faq) => (
            <FAQItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isOpen={openId === faq.id}
              onClick={() => handleToggle(faq.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
