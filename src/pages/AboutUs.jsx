import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import FAQ from "../components/FAQ";
import fitnessClub from "../assets/imgs/fitness-club.png";
import sownaClub from "../assets/imgs/sowna-club.png";

const AboutUs = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  return (
    <div 
      className="text-white min-h-screen"
      style={{
        backgroundColor: "#1d1d1d",
        backgroundImage:
          "radial-gradient(circle at center, rgba(119, 6, 11, 0.55) 0%, rgba(119, 6, 11, 0.25) 20%, rgba(29, 29, 29, 0.95) 60%, #1d1d1d 100%)",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Hero Section */}
      {/* <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-normal uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-[#d90a14] to-[#ff6b00] drop-shadow-lg mb-6"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            About Us
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Welcome To FitMaker - Your Ultimate Fitness Destination Where Passion Meets Performance
          </p>
        </div>
      </section> */}

      {/* Our Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="order-2 md:order-1">
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-wider text-white mb-6"
                style={{ fontFamily: "Gagalin, sans-serif" }}
              >
                Our <span className="text-[#d90a14]">Story</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                FitMaker Was Born From A Simple Vision: To Create A Fitness Community Where Everyone, 
                Regardless Of Their Starting Point, Can Achieve Their Health And Wellness Goals. 
                We Believe That Fitness Is Not Just About Physical Transformation, But A Journey 
                Of Self-Discovery And Personal Growth.
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Our State-Of-The-Art Facility Is Equipped With The Latest Equipment And Technology, 
                Designed To Provide You With The Best Workout Experience. From Cardio Machines To 
                Free Weights, We Have Everything You Need To Reach Your Fitness Goals.
              </p>
            </div>
            <div data-aos="fade-left" className="relative order-1 md:order-2">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#d90a14]/30 hover:border-[#d90a14] transition-all duration-300">
                <img 
                  src={fitnessClub} 
                  alt="Fitness Club" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div 
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#d90a14] rounded-full opacity-20 blur-3xl"
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Facilities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right" className="order-1 md:order-1 relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#ff6b00]/30 hover:border-[#ff6b00] transition-all duration-300">
                <img 
                  src={sownaClub} 
                  alt="Sauna Club" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div 
                className="absolute -top-4 -left-4 w-32 h-32 bg-[#ff6b00] rounded-full opacity-20 blur-3xl"
              ></div>
            </div>
            <div data-aos="fade-left" className="order-2 md:order-2">
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-wider text-white mb-6"
                style={{ fontFamily: "Gagalin, sans-serif" }}
              >
                Premium <span className="text-[#ff6b00]">Facilities</span>
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-4">
                Experience Luxury And Comfort With Our Premium Facilities. Our Gym Features A 
                Relaxing Sauna Area Where You Can Unwind After An Intense Workout Session. 
                The Perfect Place To Rejuvenate Your Body And Mind.
              </p>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                We Also Offer Modern Locker Rooms, Shower Facilities, And A Comfortable Lounge 
                Area Where You Can Relax And Socialize With Fellow Members. Your Comfort And 
                Satisfaction Are Our Top Priorities.
              </p>
              <ul className="space-y-3">
                {[
                  "State-Of-The-Art Equipment",
                  "Professional Sauna & Steam Room",
                  "Spacious Training Areas",
                  "Clean & Modern Facilities",
                  "24/7 Access Available"
                ].map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-200">
                    <span className="text-[#ff6b00] text-xl mr-3">✔</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center" data-aos="fade-up">
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-wider text-white mb-8"
            style={{ fontFamily: "Gagalin, sans-serif" }}
          >
            Our <span className="text-[#d90a14]">Mission</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {[
              {
                title: "Empower",
                description: "We Empower Our Members To Take Control Of Their Health And Fitness Journey With Expert Guidance And Support.",
                icon: "💪"
              },
              {
                title: "Inspire",
                description: "We Inspire Positive Change Through Motivation, Community, And Proven Results That Transform Lives.",
                icon: "⭐"
              },
              {
                title: "Transform",
                description: "We Transform Bodies And Minds Through Personalized Programs And A Supportive Community Environment.",
                icon: "🔥"
              }
            ].map((item, index) => (
              <div 
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-6 rounded-xl border border-[#d90a14]/30 hover:border-[#d90a14] transition-all duration-300"
                style={{ backgroundColor: "#2a2a2a" }}
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 
                  className="text-2xl font-bold text-[#ff6b00] mb-3 uppercase"
                  style={{ fontFamily: "Gagalin, sans-serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />
    </div>
  );
};

export default AboutUs;
