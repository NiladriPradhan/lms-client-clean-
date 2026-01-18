import { Courses } from "@/pages/student/Courses";
import { Hero } from "@/components/Hero";
import { useContext } from "react";
import { ThemeContext } from "@/context/theme-context";

const HeroSection = () => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext || { theme: "light" };
  return (
    <>
      <div
        className={`flex flex-col ${
          theme === "light"
            ? "bg-white"
            : theme === "dark"
              ? "bg-gray-900"
              : "bg-gray-950"
        } `}
      >
        <Hero />
        <h1
          className={`text-4xl font-bold text-center ${
            theme === "light"
              ? "text-gray-900"
              : theme === "dark"
                ? "text-white"
                : "text-white"
          }`}
        >
          Courses
        </h1>
        <Courses />
      </div>
    </>
  );
};

export default HeroSection;
