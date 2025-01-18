"use client";

import Image from "next/image";
import Link from "next/link";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-semibold text-orange-500"
        >
          <Image
            src="/logo.png"
            alt="Travelgram logo"
            width={32}
            height={32}
            className="h-8 w-8"
            priority
          />
          <span className="hidden sm:inline">Travelgram</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              placeholder="Explorar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-full border bg-gray-50 py-2 pl-10 pr-4"
              aria-label="Buscar"
            />
          </form>
          <nav className="flex items-center gap-6">
            <Link href="/explore" className="text-gray-600 hover:text-gray-900">
              Explorar
            </Link>
            <Link
              href="/my-trips"
              className="text-gray-600 hover:text-gray-900"
            >
              Minhas viagens
            </Link>
          </nav>
        </div>

        <Link href="/profile" className="flex items-center gap-4">
          <Image
            src="https://github.com/delfimcelestino.png"
            alt="Foto de perfil"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
        </Link>
      </div>
    </header>
  );
}
