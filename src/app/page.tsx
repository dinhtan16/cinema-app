import { movies } from "@/lib/data";
import { MovieCard } from "@/components/movie-card";
import { HeroCarousel } from "@/components/hero-carousel";
import Link from "next/link";

export default function Home() {
  const featuredMovies = movies.slice(0, 3);

  return (
    <div className="space-y-12 pb-10">
      {/* Hero Section */}
      <section className="relative w-full">
        <HeroCarousel movies={featuredMovies} />
      </section>

      {/* Promotions Slider Section */}
      <section className="container space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">
            Khuyến mãi hot 🔥
          </h2>
          <Link
            href="/promotions"
            className="text-primary hover:underline font-medium"
          >
            Xem tất cả →
          </Link>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {[
            {
              id: 1,
              title: "GIẢM 50%",
              subtitle: "VÉ XEM PHIM",
              description: "Áp dụng cho thành viên mới",
              image:
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
              gradient: "from-purple-600 via-pink-600 to-red-600",
              badge: "HOT",
            },
            {
              id: 2,
              title: "COMBO 99K",
              subtitle: "BẮP + NƯỚC",
              description: "Tiết kiệm đến 40%",
              image:
                "https://images.unsplash.com/photo-1585647347384-2593bc35786b?auto=format&fit=crop&w=800&q=80",
              gradient: "from-orange-600 via-amber-600 to-yellow-600",
              badge: "NEW",
            },
            {
              id: 3,
              title: "THỨ 3 VUI VẺ",
              subtitle: "CHỈ TỪ 45K",
              description: "Giá vé siêu ưu đãi",
              image:
                "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
              gradient: "from-blue-600 via-cyan-600 to-teal-600",
              badge: "SALE",
            },
          ].map((promo) => (
            <Link
              key={promo.id}
              href="/promotions"
              className="group relative shrink-0 w-96 h-56 rounded-2xl overflow-hidden border-2 border-white/10 hover:border-primary/50 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/20"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${promo.gradient} opacity-90`}
              />

              {/* Background image */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay"
                style={{ backgroundImage: `url(${promo.image})` }}
              />

              {/* Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold text-white border border-white/30">
                {promo.badge}
              </div>

              {/* Content */}
              <div className="relative h-full p-8 flex flex-col justify-between text-white">
                <div>
                  <h3 className="text-4xl font-black mb-1 drop-shadow-lg">
                    {promo.title}
                  </h3>
                  <p className="text-xl font-bold opacity-90">
                    {promo.subtitle}
                  </p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-3">{promo.description}</p>
                  <div className="inline-flex items-center gap-2 text-sm font-semibold">
                    <span>Xem chi tiết</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="container space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Phim đang chiếu</h2>
          <Link href="/movies" className="text-primary hover:underline">
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Coming Soon Section (Mocked with same data for now) */}
      <section className="container space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Sắp chiếu</h2>
          <Link
            href="/movies?type=coming-soon"
            className="text-primary hover:underline"
          >
            Xem tất cả
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.slice(2, 5).map((movie) => (
            <MovieCard key={`coming-${movie.id}`} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
