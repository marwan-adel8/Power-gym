// pages/Home.jsx
import { useEffect } from "react";
import Hero from "../components/Hero";
import Plans from "../components/Plans";

const Home = () => {
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative z-10">
      <Hero />
      <Plans />
    </div>
  );
};

export default Home;
