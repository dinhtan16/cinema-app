"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Play } from "lucide-react";
import { Movie } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HeroCarouselProps {
  movies: Movie[];
}

export function HeroCarousel({ movies }: HeroCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const currentMovie = movies[current];

  return (
    <div className="relative w-full">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-background/50 backdrop-blur-2xl z-10" />
        {currentMovie && (
          <Image
            src={currentMovie.poster}
            alt="Background"
            fill
            className="object-cover opacity-20 blur-xl scale-110 transition-all duration-1000"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background z-20" />
      </div>

      <div className="w-full max-w-5xl mx-auto pt-8 pb-12 relative z-30">
        <Carousel setApi={setApi} className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="relative aspect-[21/9] w-full"
              >
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl border border-white/10">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover brightness-75"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col justify-end h-full">
                  <div className="max-w-2xl space-y-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                    <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight lg:text-5xl text-white drop-shadow-lg">
                      {movie.title}
                    </h1>
                    <p className="text-sm md:text-lg text-gray-200 line-clamp-2 drop-shadow-md">
                      {movie.description}
                    </p>
                    <div className="flex gap-4 pt-2">
                      <Link href={`/movie/${movie.id}`}>
                        <Button size="default" className="gap-2 font-semibold">
                          <Play className="h-4 w-4 fill-current" />
                          Đặt vé
                        </Button>
                      </Link>
                      <Button
                        size="default"
                        variant="secondary"
                        className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
                      >
                        Trailer
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-black/20 hover:bg-black/40 border-0 text-white" />
          <CarouselNext className="right-4 bg-black/20 hover:bg-black/40 border-0 text-white" />
        </Carousel>
        <div className="py-6 flex justify-center gap-2">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300 shadow-lg",
                current === index
                  ? "bg-primary w-8"
                  : "bg-white/30 hover:bg-white/50"
              )}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
