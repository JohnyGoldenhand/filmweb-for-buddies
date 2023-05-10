import { NextPage } from "next";
import { api } from "~/utils/api";

const ListPage: NextPage = () => {
  const { data } = api.movieList.getAll.useQuery();
  if (!data) return <div>No data</div>;
  return (
    <div>
      {data.map((movie) => (
        <div key={movie.id}>{movie.title}</div>
      ))}
    </div>
  );
};

export default ListPage;
