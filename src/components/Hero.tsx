import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

export const Hero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (query !== "") {
      navigate(`/course/search?query=${query}`);
    }
    setQuery("");
  };
  return (
    <div className="flex flex-col bg-gray-900 h-96 justify-center items-center w-full mx-auto">
      <h1 className="capitalize text-6xl font-bold text-white">
        Find the best courses for you
      </h1>
      <p className="text-gray-400 text-lg mt-2">
        Discover, Learn, and Upskill with our wide range of courses
      </p>
      <div className="flex w-md mx-auto rounded-full my-4">
        <Input
          type="email"
          placeholder="Email"
          className="rounded-l-full border-none bg-gray-800 text-white 
             placeholder:text-gray-400 
             focus:bg-gray-800 focus-visible:bg-gray-800
             focus-visible:ring-0 focus-visible:ring-offset-0"
          value={query}
          onChange={handleQuery}
        />

        <button
          onClick={handleSearch}
          className="bg-blue-700 text-white px-2 border-none outline-0 rounded-r-full cursor-pointer"
        >
          <Search className="size-5" />
        </button>
      </div>
      <Button
        className="bg-linear-to-r from-indigo-500 via-blue-600 to-cyan-500 
             hover:from-indigo-600 hover:via-blue-700 hover:to-cyan-600
             text-white shadow-lg transition-all duration-300 rounded-full cursor-pointer"
        onClick={() => navigate(`/course/search?query`)}
      >
        Explore Courses
      </Button>
    </div>
  );
};
