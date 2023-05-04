import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import { Movie } from "typings";
import requests from "~/utils/request";
import { useState } from "react";
import { CategoriesRow } from "components/CategoriesRow/component";
import { PageContent } from "~/styles/Home.styled";
import { VALID_API_KEY } from "~/utils/request";

interface ApiResponseType {
  page: number;
  results: Array<Movie>;
  total_results: number;
  total_pages: number;
}
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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchedMovies, setSearchedMovies] = useState<null | Movie[]>(null);
  const handleSearch = async (query: string) => {
    const searchResponse: ApiResponseType = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${VALID_API_KEY}&query=${query}`
    ).then((res) => res.json());
    setSearchedMovies(searchResponse.results);
  };

  return (
    <PageContent>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(searchQuery);
        }}
      >
        <input
          type="text"
          placeholder="Search a movie"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <main>
        {searchedMovies ? (
          <CategoriesRow
            categoryName={searchQuery}
            movies={searchedMovies}
            size={300}
          />
        ) : (
          <section>
            <CategoriesRow
              categoryName="Trending now"
              movies={trendingNow}
              size={300}
            />
            <CategoriesRow
              categoryName="Top rated"
              movies={topRated}
              size={300}
            />
            <CategoriesRow
              categoryName="Action"
              movies={actionMovies}
              size={300}
            />
            <CategoriesRow
              categoryName="Comedy"
              movies={comedyMovies}
              size={300}
            />
            <CategoriesRow
              categoryName="Horror"
              movies={horrorMovies}
              size={300}
            />
            <CategoriesRow
              categoryName="Romance"
              movies={romanceMovies}
              size={300}
            />
            <CategoriesRow
              categoryName="Documentaries"
              movies={documentaries}
              size={300}
            />
          </section>
        )}
      </main>
    </PageContent>
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
  ]: Array<ApiResponseType> = await Promise.all([
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
      trendingNow: trendingNow?.results,
      topRated: topRated?.results,
      actionMovies: actionMovies?.results,
      comedyMovies: comedyMovies?.results,
      horrorMovies: horrorMovies?.results,
      romanceMovies: romanceMovies?.results,
      documentaries: documentaries?.results,
    },
  };
};

export default Home;
