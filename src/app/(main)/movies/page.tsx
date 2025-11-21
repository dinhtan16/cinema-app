"use client";

import { movies } from "@/lib/data";
import { MovieCard } from "@/components/movie-card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MoviesList() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase() || "";

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query)
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">
        {query ? `Kết quả tìm kiếm cho "${query}"` : "Tất cả phim"}
      </h1>
      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-muted-foreground">
          Không tìm thấy phim nào phù hợp.
        </div>
      )}
    </div>
  );
}

export default function MoviesPage() {
  return (
    <div className="container py-10">
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesList />
      </Suspense>
    </div>
  );
}
