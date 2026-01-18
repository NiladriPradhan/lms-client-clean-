import { Loader } from "lucide-react";

export default function LoadingSpinner() {
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="">
        <Loader className="animate-spin h-16 w-16 text-blue-600" />
        <p className="text-gray-700 text-lg ">Loading...</p>
      </div>
    </div>
  );
}
