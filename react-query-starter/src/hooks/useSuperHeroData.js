import { useQuery } from "react-query";
import axios from "axios";

// const fetchSuperHeroData = (heroId) => {
//   return axios.get(`http://localhost:4000/superheroes/${heroId}`);
// };

// export const useSuperHeroData = (heroId) => {
//   return useQuery(["super-hero", heroId], () => fetchSuperHeroData(heroId));
// };

const fetchSuperHeroData = ({ queryKey, ...otherParams }) => {
  console.log(otherParams);
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useSuperHeroData = (heroId) => {
  return useQuery(["super-hero", heroId], fetchSuperHeroData);
};

//Note: why we use array for defining unique key of useQuery hook

// if we just use useQuery('super-hero', fetchSuperHeroData);

// Then if we hit the api for superheroes/1 then in the react query cache we have
// RQ ID  = super-hero and cache data for super hero 1

// Now if we try to hit api call for super hero 2 with endpoint superheroes/2
// Then also in react query hook we have ID = super-hero which is not unique for this time

// That's why react query thinks that this API call is already made and we have cache result for that also hence returns the cache result which was for super hero 1. Which is wrong. We should make an api call for super hero 2 also.

// Because RQ compares the ID for uniquely identifying the api calls hence we need to make id unique for each super hero api call.

// for passing multiple keys we can use array in useQuery hook.
// Now for superhero/1 we have api call like ['super-hero',1]
// Now for superhero/2 we have api call like ['super-hero',2]

// useQuery hooks passes many values in fetcher function callback
// so we need not require to pass heroId
// Because in the fetcher function param we can destructure queryKey which is equal to ['super-hero', 1]
// which is basically an array of values.
// now here we can access and value at index 1 which is our user ID
