"use client";

import { useState, useRef, MouseEvent, useEffect } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { stories } from "@/app/mockData";
import { Story } from "@/types/storie";
import { Skeleton } from "@/components/ui/skeleton";

const Stories = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [formattedDates, setFormattedDates] = useState<{
    [key: number]: string;
  }>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  // Hydration safety: Only mount component after initial render
  useEffect(() => {
    setMounted(true);
  }, []);

  // Format dates on client-side only to avoid hydration mismatch
  useEffect(() => {
    if (mounted) {
      const dates: { [key: number]: string } = {};
      stories.forEach((story) => {
        const timeAgo = new Intl.RelativeTimeFormat("pt-BR", {
          numeric: "auto",
        });
        const diffInHours = Math.round(
          (new Date().getTime() -
            new Date(story.latestStory.createdAt).getTime()) /
            (1000 * 60 * 60)
        );

        if (diffInHours < 24) {
          dates[story.id] = timeAgo.format(-diffInHours, "hour");
        } else {
          const diffInDays = Math.floor(diffInHours / 24);
          dates[story.id] = timeAgo.format(-diffInDays, "day");
        }
      });
      setFormattedDates(dates);
    }
  }, [mounted]);

  const handleMouseDown = (e: MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Loading skeleton
  if (!mounted) {
    return (
      <ScrollArea className="w-full rounded-xl border bg-white shadow-sm">
        <div className="flex w-max space-x-4 p-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2">
              <Skeleton className="h-16 w-16 rounded-full" />
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-2 w-12" />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-full rounded-xl border bg-white shadow-sm">
      <div
        ref={scrollRef}
        className={`flex w-max space-x-4 p-4 cursor-grab active:cursor-grabbing ${
          isDragging ? "select-none" : ""
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {stories.map((story: Story) => (
          <button
            key={story.id}
            className="flex flex-col items-center space-y-1 focus:outline-none group"
            onClick={() => console.log(`Viewing story from ${story.username}`)}
          >
            <div className="relative h-16 w-16 transform transition-transform group-hover:scale-105">
              <div
                className={`absolute inset-0 rounded-full ${
                  story.viewed
                    ? "bg-gray-200"
                    : "bg-gradient-to-tr from-orange-400 to-pink-500"
                } p-[2px]`}
              >
                <div className="h-full w-full rounded-full border-2 border-white bg-white p-[2px] overflow-hidden">
                  <div className="relative h-full w-full rounded-full overflow-hidden">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={`Story de ${story.username}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                      priority={story.id <= 4} // Prioritize loading first 4 stories
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs font-medium text-gray-900 truncate max-w-[80px]">
                {story.username}
              </span>
              <span className="text-[10px] text-gray-500 truncate max-w-[80px]">
                {formattedDates[story.id] || ""}
              </span>
            </div>
          </button>
        ))}
      </div>
      <ScrollBar
        orientation="horizontal"
        className="hover:bg-gray-100 transition-colors"
      />
    </ScrollArea>
  );
};

export default Stories;
