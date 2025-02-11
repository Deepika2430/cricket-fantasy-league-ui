import React from "react";
import { useTheme } from "./ui/theme-provider";
import CricketLiveScore from "./CricketLiveScore";
import PlayerCarousel from "./PlayerCarousel";
import BlogSection from "./BlogSection";
import HowToPlay from "./HowToPlay";

const Home: React.FC = () => {
  const { theme } = useTheme();
  const applicationName = "Dream11"; // Replace with actual app name if different

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center p-5 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <CricketLiveScore />
      <HowToPlay />
      <BlogSection />
      <PlayerCarousel />

          </div>
  );
};

export default Home;
