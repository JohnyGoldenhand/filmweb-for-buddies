import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import { Movie } from "typings";
import requests from "~/utils/request";
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
  const [
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
    },
  };
};

export default Home;
