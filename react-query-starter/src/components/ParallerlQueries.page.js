import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};

const fetchFriends = () => {
  return axios.get("http://localhost:4000/friends");
};

export const ParallelQueriesPage = () => {
  // On component load if you want to fire multiple api calls then use useQuery hook multiple times for multiple queries
  // because resultant output from useQuery is similar hence use type alias to assign unique names

  const { data: superHeroes } = useQuery("super-heroes", fetchSuperHeroes);
  const { data: friends } = useQuery("friends", fetchFriends);
  console.log(superHeroes, friends);
  return <div>Parallel Queries</div>;
};
