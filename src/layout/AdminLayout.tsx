import Navbar from "@/components/Navbar";
import { useTheme } from "@/context/useTheme";
import Sidebar from "@/pages/admin/Sidebar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const { theme } = useTheme();
  const themeClasses =
    theme === "light"
      ? "bg-white text-black"
      : theme === "dark"
        ? "bg-gray-900 text-white"
        : "bg-gray-950 text-white";

  return (
    <div className={`h-screen overflow-hidden ${themeClasses}`}>
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-white border-b">
        <Navbar />
      </header>

      {/* Sidebar (desktop only) */}
      <aside className="hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] w-72 border-r bg-[#f0f0f0] z-40">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 lg:pl-96 h-full overflow-y-auto p-4 sm:p-6 lg:p-10 ${themeClasses} `}
      >
        <Outlet />
      </main>
    </div>
  );
}
