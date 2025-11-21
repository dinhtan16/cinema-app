import { movies } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Star, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MovieReviews } from "@/components/movie-reviews";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Backdrop */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={movie.poster}
          alt={movie.title}
          fill
          className="object-cover brightness-[0.3] blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative -mt-32 z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="shrink-0 mx-auto md:mx-0 w-64 md:w-80 aspect-[2/3] relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6 pt-8 md:pt-32 text-center md:text-left">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                {movie.title}
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {movie.duration} phút
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  2024
                </div>
                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                  <Star className="h-4 w-4 fill-current" />
                  {movie.rating}/5
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {movie.genre.map((g) => (
                <Badge
                  key={g}
                  variant="secondary"
                  className="text-sm px-3 py-1"
                >
                  {g}
                </Badge>
              ))}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {movie.description}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
              <Link href={`/booking/${movie.id}`}>
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 h-12 gap-2"
                >
                  <Play className="h-5 w-5 fill-current" />
                  Đặt vé ngay
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-lg px-8 h-12"
              >
                Xem Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-16 space-y-12">
        {/* Cast Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Diễn viên</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {movie.cast.map((actor) => (
              <div key={actor.name} className="text-center space-y-2 group">
                <div className="relative aspect-square rounded-full overflow-hidden border-2 border-primary/20 group-hover:border-primary transition-colors">
                  <Image
                    src={actor.image}
                    alt={actor.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                <div>
                  <div className="font-bold text-sm">{actor.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {actor.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trailer Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Trailer</h2>
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-white/10 bg-black shadow-2xl">
            <iframe
              src={movie.trailerUrl}
              title={`Trailer ${movie.title}`}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </section>

        {/* Reviews Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Đánh giá & Bình luận</h2>
          <MovieReviews movieId={id} />
        </section>
      </div>
    </div>
  );
}
