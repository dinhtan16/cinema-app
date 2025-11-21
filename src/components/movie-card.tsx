import Link from "next/link";
import { Movie } from "@/lib/data";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from "lucide-react";
import Image from "next/image";

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="overflow-hidden border-0 bg-secondary/20 hover:bg-secondary/40 transition-colors group h-full flex flex-col">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={movie.poster}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1 text-yellow-500 text-xs font-bold">
            <Star className="h-3 w-3 fill-yellow-500" />
            {movie.rating}
          </div>
        </div>
        <CardContent className="p-4 flex-1">
          <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="secondary" className="text-xs">
                {g}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 text-sm text-muted-foreground flex items-center gap-2">
          <Clock className="h-4 w-4" />
          {movie.duration} phút
        </CardFooter>
      </Card>
    </Link>
  );
}
