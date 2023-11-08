import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieData } from "@/types/movies";
import { shimmer, toBase64 } from "@/utils/shimmerImage";
import { formatDate } from "@/utils/helper";

interface MovieCardProps {
  movie: MovieData;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link href={`/movie/${movie.id}`} passHref>
      <div className="w-full h-full border-[1px] border-gray-200 rounded-md">
        <div className="h-56 w-full relative overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(200, 200)
            )}`}
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            className="rounded-t-md transition-all ease-in-out duration-300 hover:scale-105 w-full object-cover"
            alt={movie.title}
          />
        </div>

        <div className="p-2 text-center rounded-b-md">
          <h1 className="text-center text-xl font-bold uppercase">
            {movie.title}
          </h1>
          <p className="text-center text-sm text-blue-500">
            release date: {formatDate(movie.release_date)}
          </p>
          <p className="font-semibold text-slate-700">
            rating: {movie.vote_average}
          </p>
          <p className="font-semibold text-slate-700">
            adult: {movie.adult.toString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
