import { useQueries } from "react-query";
import axios from "axios";

const fetchSuperHero = (heroId) => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map((id) => {
      return {
        queryKey: ["super-hero", id],
        queryFn: () => fetchSuperHero(id),
      };
    })
  );

  console.log({ queryResults });
  return <div>Dynamic Parallel Queries</div>;
};

// calling useQuery multiple times can solve the problem of firing multiple api's

// But if you have dynamic number of queries. Like firing api for n no of heroes with ids = [1,3,2,4,8]

// Here you can not define useQuery hook separately for each id

// here RQ provides useQueries hooks

// It helps you to fire same endpoint for different id's dynamically

// It returns a query result which is an array of results
