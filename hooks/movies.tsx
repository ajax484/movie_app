import { useEffect, useState } from "react";
import axios from "axios";
import { MovieData } from "@/types/movies";

interface useFetchMoviesParams {
  query: string;
  page: number;
}

export const useFetchMovies = ({ query, page }: useFetchMoviesParams) => {
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      console.log(query);
      const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
      if (!apiKey) {
        console.error("Movie API key not found in environment variables.");
        setError(true);
        return;
      }

      const url: string = `https://api.themoviedb.org/3/${
        query !== "" ? "search" : "discover"
      }/movie?api_key=${apiKey}&page=${page}&${
        query !== ""
          ? `query=${query}`
          : "include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc"
      }`;
      const headers = {
        accept: "application/json",
      };
      setLoading(true);

      try {
        const response = await axios.get(url, { headers });
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        console.log(response.data);
      } catch (error) {
        console.error("Error: " + error);
        setError(true);
      }

      setLoading(false);
    })();
  }, [page, query]);

  return { movies, totalPages, loading, error };
};

interface useFetchMoviesParams {
  id: string;
}

export const useFetchMovie = ({ id }: useFetchMovieParams) => {
  const [movie, setMovie] = useState<MovieData>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;
      if (!apiKey) {
        console.error("Movie API key not found in environment variables.");
        setError(true);
        return;
      }

      const url: string = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`;
      const headers = {
        accept: "application/json",
      };
      setLoading(true);

      try {
        const response = await axios.get(url, { headers });
        setMovie(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error: " + error);
        setError(true);
      }

      setLoading(false);
    })();
  }, [id]);

  return { movie: movie || {}, loading, error };
};
