import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { user } = useUser();
  return <main></main>;
};

export default Home;
