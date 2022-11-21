import { useParams } from "react-router-dom";
import { useSuperHeroData } from "../hooks/useSuperHeroData";
export const RQSuperHeroPage = () => {
  const { heroId } = useParams();
  const {
    isLoading,
    isError,
    data: response,
    error,
  } = useSuperHeroData(heroId);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div>
      Super Hero Details
      <div>
        {response?.data.name} - {response?.data.alterEgo}
      </div>
    </div>
  );
};
