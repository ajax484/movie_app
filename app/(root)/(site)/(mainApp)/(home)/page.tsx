"use client";
import Loading from "@/components/Loading";
import MovieCard from "@/components/MovieCard";
import Pagination from "@/components/Pagination";
import { useFetchMovies } from "@/hooks/movies";
import { MovieData } from "@/types/movies";
import { useDebounce } from "@uidotdev/usehooks";
import { ChangeEvent, useState } from "react";

export default function Page() {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);
  const [page, setPage] = useState<number>(1);
  const { movies, totalPages, loading, error } = useFetchMovies({
    query: debouncedQuery,
    page,
  });

  const changePage = (page: number) => setPage(page);

  // console.log(movies);

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <input
          id="input"
          type="text"
          className="mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
          placeholder="Enter your query"
          onInput={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          value={query}
        />
      </div>

      <Loading loading={loading}>
        <Pagination
          currentPage={page}
          onPageChange={changePage}
          totalPages={totalPages}
        />
        <div className="grid md:grid-cols-2 gap-x-4 gap-y-6 px-6 md:px-12">
          {movies.map((movie: MovieData) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
        <Pagination
          currentPage={page}
          onPageChange={changePage}
          totalPages={totalPages}
        />
      </Loading>
    </div>
  );
}
