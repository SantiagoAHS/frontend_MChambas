// app/Home.tsx
import React from "react";
import HeroSection from "@/components/layout/HeroSection";
import Features from "@/components/layout/Features";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <Features />
    </>
  );
};

export default Home;
