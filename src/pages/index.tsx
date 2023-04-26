import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import { Movie, ResponseDataType } from "typings";
import { api } from "~/utils/api";
import fetchMultiple from "~/utils/request";
import { requests } from "~/utils/request";
interface HomePageProps {
  trendingNow: Array<Movie>;
  topRated: Array<Movie>;
  actionMovies: Array<Movie>;
  comedyMovies: Array<Movie>;
  horrorMovies: Array<Movie>;
  romanceMovies: Array<Movie>;
  documentaries: Array<Movie>;
}

const Home: NextPage<HomePageProps> = ({
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) => {
  const { user } = useUser();

  return (
    <main>
      <section>
        {trendingNow.map((movie) => (
          <div key={movie.id}>
            <Image
              src={`https://image.tmdb.org/t/p/w500${
                movie.backdrop_path || movie.poster_path
              }`}
              alt="poster"
              width={40}
              height={80}
            />
          </div>
        ))}
      </section>
    </main>
  );
};

export const getServerSideProps = async () => {
  const categories: ResponseDataType[] = await fetchMultiple(requests);

  const [
    { results: trendingNow } = { results: [] },
    { results: topRated } = { results: [] },
    { results: actionMovies } = { results: [] },
    { results: comedyMovies } = { results: [] },
    { results: horrorMovies } = { results: [] },
    { results: romanceMovies } = { results: [] },
    { results: documentaries } = { results: [] },
  ] = categories || [];

  return {
    props: {
      trendingNow,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    },
  };
};

export default Home;
