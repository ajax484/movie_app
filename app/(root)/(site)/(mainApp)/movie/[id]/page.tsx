"use client";
import axios from "axios";
import React from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useFetchMovie } from "@/hooks/movies";

interface SingleMovieCardProps {
  params: { id: string };
}

const SingleMovieCard: React.FC<SingleMovieCardProps> = ({ params }) => {
  const { id } = params;
  const { movie, loading, error } = useFetchMovie({ id });

  return (
    <Loading loading={loading}>
      <section className="px-6 md:px-12 pt-6 md:pt-12">
        <div className="flex flex-col md:flex-row gap-y-10 gap-x-10 items-center justify-between">
          <div className="w-full">
            <Image
              alt="movie image"
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              width={1000}
              height={1000}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full capitalize">
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            {/* <p className="mt-5 text-gray-600 text-sm">
              Genres:
              <span className="font-bold">
                {movie.genres.map((genre) => genre.name).join(", ")}
              </span>
            </p> */}
            <p className="text-slate-700 text-sm mb-5">
              Release Date:
              <span className="font-bold">{movie.release_date}</span>
            </p>
            <p>Rating: {movie.vote_average}</p>
            <p>Language: {movie.original_language}</p>
            <p>popular: {movie.popularity}</p>

            <p className="my-5 text-sm leading-7 text-slate-700">
              {movie.overview}
            </p>
          </div>
        </div>
      </section>
    </Loading>
  );
};

export default SingleMovieCard;
