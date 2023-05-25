import { NextPage } from "next";
import { api } from "~/utils/api";

const ListPage: NextPage = () => {
  const { data, isLoading } = api.movieList.getAll.useQuery();
  if (!data) return <div>No data</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      {data.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default ListPage;
