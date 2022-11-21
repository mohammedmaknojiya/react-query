import { useSuperHeroesData } from "../hooks/useSuperHeroesData";

export const RQSuperHeroesCustomPage = () => {
  const onSuccess = (data) => {
    console.log("Query succeeded:", data);
  };

  const onError = (error) => {
    console.log("query fails", error);
  };

  const {
    isLoading,
    data: response,
    error,
    isError,
  } = useSuperHeroesData(onSuccess, onError);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  return (
    <>
      <h2>React Query Super Heroes Page With Custom Hook</h2>

      <div>
        {response?.data.map((superHero, index) => (
          <div key={`${superHero.name}-${index}`}>{superHero.name}</div>
        ))}
      </div>
    </>
  );
};
