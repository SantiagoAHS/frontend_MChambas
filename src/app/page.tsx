// app/Home.tsx
import React from "react";
import HeroSection from "@/components/layout/HeroSection";
import Features from "@/components/layout/Features";
import ImageCarousel from "@/components/layout/ImageCarousel";

const Home: React.FC = () => {
  return (
    <>
      <HeroSection />
      <ImageCarousel />
      <Features />
    </>
  );
};

export default Home;
