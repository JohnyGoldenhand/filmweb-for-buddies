import Image from "next/image";
import { FC } from "react";
import type { Movie } from "typings";
import { StyledRow } from "./component.styled";
import Link from "next/link";

interface CategoriesRowType {
  movies: Array<Movie>;
  size: number;
  categoryName: string;
}

export const CategoriesRow: FC<CategoriesRowType> = ({
  movies,
  size,
  categoryName,
}) => {
  return (
    <>
      <label>{categoryName}</label>
      <StyledRow>
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
              alt="poster"
              width={size}
              height={size}
            />
            <span>{movie.title}</span>
          </Link>
        ))}
      </StyledRow>
    </>
  );
};
