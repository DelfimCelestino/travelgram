"use client";

import Image from "next/image";
import { MapPin } from "lucide-react";
import { Traveler } from "@/types/traveler";

const ProfileDetails = ({ traveler }: { traveler: Traveler }) => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-start md:gap-8">
        <Image
          src={traveler.avatar}
          alt="Foto de perfil"
          width={160}
          height={160}
          className="h-32 w-32 md:h-40 md:w-40 rounded-full object-cover"
        />
        <div className="mt-4 md:mt-0">
          <h1 className="text-2xl font-semibold">{traveler.name}</h1>
          <p className="mt-2 text-gray-600">{traveler.bio}</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              {traveler.location}
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <span>{traveler.posts.length} posts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
