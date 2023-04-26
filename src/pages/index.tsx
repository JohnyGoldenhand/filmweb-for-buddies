import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import { Movie } from "typings";
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
          <div>
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
  const categories = await fetchMultiple(requests);

  const [
    { results: trendingNow },
    { results: topRated },
    { results: actionMovies },
    { results: comedyMovies },
    { results: horrorMovies },
    { results: romanceMovies },
    { results: documentaries },
  ] = categories;

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
