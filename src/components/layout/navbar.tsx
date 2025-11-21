"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Film } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { AuthModal } from "@/components/auth-modal";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { movies } from "@/lib/data";
import Image from "next/image";

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/movies?search=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
      setSearchQuery("");
    }
  };

  const filteredMovies = searchQuery.trim()
    ? movies
        .filter((movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (movieId: string) => {
    router.push(`/movie/${movieId}`);
    setShowSuggestions(false);
    setSearchQuery("");
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed z-50 transition-all duration-300 border-white/10 bg-background/30 backdrop-blur-xl supports-[backdrop-filter]:bg-background/30 ${
        scrolled
          ? "top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-2xl border shadow-lg"
          : "top-0 left-0 w-full border-b"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-primary tracking-tighter hover:opacity-80 transition-opacity"
          >
            <Film className="h-6 w-6" />
            <span>CINEVIBE</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="transition-colors hover:text-primary">
              Trang chủ
            </Link>

            {/* Movies Dropdown */}
            <div className="relative group">
              <button className="transition-colors hover:text-primary flex items-center gap-1">
                Phim
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href="/movies?filter=now-showing"
                  className="block px-4 py-2 hover:bg-secondary/50 transition-colors rounded-t-lg"
                >
                  Phim đang chiếu
                </Link>
                <Link
                  href="/movies?filter=coming-soon"
                  className="block px-4 py-2 hover:bg-secondary/50 transition-colors rounded-b-lg"
                >
                  Phim sắp chiếu
                </Link>
              </div>
            </div>

            <Link
              href="/promotions"
              className="transition-colors hover:text-primary"
            >
              Khuyến mãi
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div ref={searchRef} className="relative hidden sm:block w-64">
            <form onSubmit={handleSearch}>
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground z-10" />
              <Input
                type="search"
                placeholder="Tìm kiếm phim..."
                className="pl-9 bg-secondary/50 border-transparent focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim() && (
              <div className="absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-lg overflow-hidden z-50">
                {filteredMovies.length > 0 ? (
                  <div className="py-2">
                    {filteredMovies.map((movie) => (
                      <button
                        key={movie.id}
                        onClick={() => handleSuggestionClick(movie.id)}
                        className="w-full px-3 py-2 flex items-center gap-3 hover:bg-secondary/50 transition-colors text-left"
                      >
                        <div className="relative w-10 h-14 rounded overflow-hidden shrink-0">
                          <Image
                            src={movie.poster}
                            alt={movie.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                            {movie.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {movie.genre} • {movie.duration} phút
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                    Không tìm thấy phim nào
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/my-tickets"
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-md hover:bg-secondary/50 transition-colors"
              title="Vé đã mua"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
              <span className="text-sm font-medium">Vé đã mua</span>
            </Link>
            <ModeToggle />
            <AuthModal />
          </div>
        </div>
      </div>
    </header>
  );
}
