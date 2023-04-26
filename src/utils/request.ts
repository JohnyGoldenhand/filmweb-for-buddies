import { ResponseDataType } from "typings";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

interface RequestType {
  url: string;
}

export const requests = [
  {
    key: "fetchTrending",
    url: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  },
  {
    key: "fetchTopRated",
    url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  },
  {
    key: "fetchActionMovies",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=28`,
  },
  {
    key: "fetchComedyMovies",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=35`,
  },
  {
    key: "fetchHorrorMovies",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=27`,
  },
  {
    key: "fetchRomanceMovies",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=10749`,
  },
  {
    key: "fetchDocumentaries",
    url: `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&with_genres=99`,
  },
];

const fetchMultiple = async (
  requests: Array<RequestType>
): Promise<Array<ResponseDataType>> => {
  const responses = await Promise.all(
    requests.map((request) => fetch(request.url).then((res) => res.json()))
  );
  return responses.filter(
    (response) => response !== undefined
  ) as ResponseDataType[];
};

export default fetchMultiple;
