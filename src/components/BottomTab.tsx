"use client";

import Link from "next/link";
import { Home, Star, User } from "lucide-react"; // Import icons from lucide-react

export default function BottomTab() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md">
      <div className="flex justify-around p-2">
        <Link href="/" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-sm">Home</span>
        </Link>
        <Link href="/explore" className="flex flex-col items-center">
          <Star className="h-6 w-6" />
          <span className="text-sm">Explore</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center">
          <User className="h-6 w-6" />
          <span className="text-sm">Profile</span>
        </Link>
      </div>
    </div>
  );
}
