import { useQuery } from "react-query";
import axios from "axios";
import { Link } from "react-router-dom";

const fetchSuperHeroes = () => {
  return axios.get("http://localhost:4000/superheroes");
};
export const RQSuperHeroesPage = () => {
  const onSuccess = (data) => {
    //you will get the result obj in the callback function parameter
    console.log("Query succeeded:", data);
  };

  const onError = (error) => {
    // you will get error obj in callback function parameter
    // RQ tries 3 time calling an API before throwing an error
    console.log("query fails", error);
  };

  // useQuery at least takes 2 arguments.
  // one is unique key : used to identify each query
  // second is call back function which returns a promise and used to make get request
  const {
    isLoading,
    data: response,
    error,
    isError,
    // refetch,
  } = useQuery(
    "super-heroes",
    fetchSuperHeroes,
    //staleTime: Sometime we doesn't want to perform background fetch. It is okay for us if user sees stale data for some amount of time. React query has default staleTime of 0 sec and cacheTime of 5 min.

    //refetchOnMount - default is true. Means when component is Mounted and if data is stale then api call is hit. Otherwise don't hit the api call. If false then api call is made only once.
    // If set to true, the query will refetch on mount if the data is stale. If set to false, will disable additional instances of a query to trigger background re fetches. If set to 'always', the query will always refetch on mount. If set to a function, the function will be executed with the latest data and query to compute the value Defaults to true.

    // refetchOnWindowFocus - If set to true, the query will refetch on window focus if the data is stale. If set to false, the query will not refetch on window focus. If set to 'always', the query will always refetch on window focus. If set to a function, the function will be executed with the latest data and query to compute the value. Defaults to true.
    //Suppose user was on /analytics/gold-price page. He visit some another website in the new tab.
    //Now when he comes back to the same page he must see the updated gold price data. Hence on window focus we need to make an api call again. Otherwise we need to refresh for new data.

    //Consider you have a polling website. Where you show a polling results of voting. For that you have to fire a fetch request after every interval to get latest updated data.
    //you can specify that in refetchInterval property.
    //NOTE: refetchInterval property stops firing query if window focus is lost or we switch the tab.
    // for firing interval query in background also. You can use refetchIntervalInBackground flag.
    // refetchInterval - If set to a number, the query will continuously refetch at this frequency in milliseconds. If set to a function, the function will be executed with the latest data and query to compute a frequency Defaults to false.
    // refetchIntervalInBackground - If set to true, the query will continue to refetch while their tab/window is in the background. Defaults to false.

    //Some times you wants to fetch the data based on some events. Like button click etc. To avoid fetching data on the mount phase. You can use enabled flag. Make it false to avoid data fetching on mount phase.
    // Set this to false to disable automatic refetching when the query mounts or changes query keys. To refetch the query, use the refetch method returned from the useQuery instance. Defaults to true

    // RQ return onSuccess and onError callbacks. You can define what to do after query succeeded or fails.

    // Data Transformation: Sometimes you need to transform the data return from an api. RQ provides a select function to perform data transformation.
    {
      // staleTime: 3000,
      // refetchOnMount: false,
      // refetchOnWindowFocus: true,
      // refetchInterval: 3000,
      // refetchIntervalInBackground: true,
      // enabled: false,
      onSuccess: onSuccess,
      onError: onError, // you can use shorthand syntax also if function name are similar
      select: (data) => {
        const transformedData = data.data.map((user) => ({
          ...user,
          userId: user.id,
        }));
        console.log(transformedData);
        return transformedData;
      },
    }
  );

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page</h2>
      {/* <button onClick={refetch}>Fetch Data</button> */}

      <div>
        {/* {response?.data.map((superHero, index) => (
          <div key={`${superHero.name}-${index}`}>{superHero.name}</div>
        ))} */}
        {/* {response?.map(
          // response == transformedData array
          (superHero, index) => (
            <div key={`${superHero.name}-${index}`}>{superHero.name}</div>
          )
        )} */}
        {response?.map(
          // response == transformedData array
          (superHero, index) => (
            <div key={`${superHero.name}-${index}`}>
              <Link to={`/rq-super-heroes/${superHero.id}`}>
                {superHero.name}
              </Link>
            </div>
          )
        )}
      </div>
    </>
  );
};
