import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import { Movie, ResponseDataType } from "typings";
import { api } from "~/utils/api";
import requests from "~/utils/request";

interface HomePageProps {
  trendingNow: ResponseDataType;
  topRated: ResponseDataType;
  actionMovies: ResponseDataType;
  comedyMovies: ResponseDataType;
  horrorMovies: ResponseDataType;
  romanceMovies: ResponseDataType;
  documentaries: ResponseDataType;
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
        {trendingNow.results.map((movie) => (
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

interface RequestType {
  url: string;
}

const fetchMultiple = async (requests: RequestType[]) => {
  const responses = await Promise.all(
    requests.map((request) => fetch(request.url).then((res) => res.json()))
  );
  return responses;
};

export const getServerSideProps = async () => {
  const categories = await fetchMultiple(requests);

  const [
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
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
