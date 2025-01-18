"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Star, User } from "lucide-react"; // Import icons from lucide-react

export default function BottomTab() {
  const currentPath = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md md:hidden">
      <div className="flex justify-around p-2">
        <Link
          href="/"
          className={`flex flex-col items-center ${
            currentPath === "/" ? "text-orange-500  " : "text-gray-600"
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-sm">Home</span>
        </Link>
        <Link
          href="/explore"
          className={`flex flex-col items-center ${
            currentPath === "/explore" ? "text-orange-500" : "text-gray-600"
          }`}
        >
          <Star className="h-6 w-6" />
          <span className="text-sm">Explore</span>
        </Link>
        <Link
          href="/profile"
          className={`flex flex-col items-center ${
            currentPath === "/profile" ? "text-orange-500" : "text-gray-600"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-sm">Profile</span>
        </Link>
      </div>
    </div>
  );
}
