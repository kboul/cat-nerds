import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import BreedTable from "./BreedTable";
import { CenteredText } from "../../components";
import { getBreedDetails } from "../../api";
import { Breed } from "../../models";
import { queryKeys } from "../../constants";

export default function BreedDetails() {
  const { breedId } = useParams();

  const { isFetching, data: breedDetails } = useQuery({
    queryKey: [queryKeys.breedDetails, breedId],
    queryFn: () => getBreedDetails(breedId ?? ""),
    initialData: {} as Breed,
    enabled: !!breedId
  });

  let content = null;
  if (isFetching) content = <CenteredText text="Loading breed details..." />;

  if (Object.keys(breedDetails).length > 0)
    content = <BreedTable data={breedDetails} />;

  if (!isFetching && Object.keys(breedDetails).length === 0)
    content = (
      <CenteredText text="There does not seem to be such breed category." />
    );

  return content;
}
