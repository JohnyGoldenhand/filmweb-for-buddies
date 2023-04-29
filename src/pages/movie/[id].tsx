import { GetStaticProps, NextPage } from "next";

import { ParsedUrlQuery } from "querystring";

interface generee {
  id: number;
  name: string;
}

interface MovieDetailsType {
  genres: Array<generee>;
  id: string;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  runtime: number;
}

interface MoviePageProps extends ParsedUrlQuery {
  id: string;
}

const MoviePage: NextPage<{ movieDetails: MovieDetailsType }> = ({
  movieDetails,
}) => {
  return (
    <div>
      {movieDetails.title}
      {movieDetails.release_date}
      {movieDetails.runtime}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  if (!API_KEY) throw new Error("no key");

  const { id } = params as MoviePageProps;
  const movieDetails: MovieDetailsType = await fetch(`    
    https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`).then(
    (res) => res.json()
  );

  return {
    props: {
      movieDetails,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default MoviePage;
