import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import BreedTable from "./BreedTable";
import { CenteredText } from "../../components";
import { getBreedDetails } from "../../api";
import { CatBreed } from "../../models";
import { queryKeys } from "../../constants";

export default function BreedDetails() {
  const { breedId } = useParams();

  const {
    isFetching,
    isError,
    data: breedDetails
  } = useQuery({
    queryKey: [queryKeys.breedDetails, breedId],
    queryFn: () => getBreedDetails(breedId ?? ""),
    initialData: {} as CatBreed,
    enabled: !!breedId
  });

  let content = null;
  if (isFetching) content = <CenteredText text="Loading breed details..." />;

  if (Object.keys(breedDetails).length > 0)
    content = <BreedTable data={breedDetails} />;

  if (isError)
    content = (
      <CenteredText text="There was an error while fetching the breed details." />
    );

  return content;
}
