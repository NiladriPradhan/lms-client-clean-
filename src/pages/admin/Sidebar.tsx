import { useTheme } from "@/context/useTheme";
import { ChartNoAxesColumn, Library } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const { theme } = useTheme();
  const themeClasses =
    theme === "light"
      ? "bg-white text-black"
      : theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-950 text-white";

  const handleSelect = (btnType: string) => {
    //   setActive(btnType);
    switch (btnType) {
      case "dashboard":
        setActive("dashboard");
        break;
      case "courses":
        setActive("courses");
        break;
      default:
        break;
    }
  };
  return (
    <div className="space-y-6">
      <div
        className={`hidden lg:block fixed w-62.5 sm:w-75 min-h-screen border-r border-gray-300 space-y-8 dark:border-gray-700 p-5 top-0 ${themeClasses}`}
      >
        <div className="space-y-4">
          <ul className="pt-20">
            <li onClick={() => handleSelect("dashboard")}>
              <Link
                to={"/admin/dashboard"}
                className={` ${
                  active === "dashboard" ? "text-white  bg-blue-500" : ""
                } flex gap-x-4 py-2 px-4 rounded-md`}
              >
                <ChartNoAxesColumn size={22} />
                <h1>Dashboard</h1>
              </Link>
            </li>
            <li onClick={() => handleSelect("courses")}>
              <Link
                to={"/admin/courses"}
                className={` ${
                  active === "courses" ? "text-white  bg-blue-500" : ""
                } flex gap-x-4 py-2 px-4 rounded-md`}
              >
                <Library size={22} />
                <h1>Courses</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
