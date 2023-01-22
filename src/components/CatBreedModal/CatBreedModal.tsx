import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Modal from "../Modal";
import CenteredText from "../CenteredText";
import CatImageCard from "../CatImageCard";
import { routes } from "../../routes";
import { getCatImages } from "../../api";
import { queryKeys } from "../../constants";

export default function CatBreedModal() {
  const navigate = useNavigate();
  const { breedId } = useParams();

  const {
    isFetching,
    isError,
    data: catBreeds
  } = useQuery({
    initialData: [],
    queryKey: [queryKeys.catBreeds, breedId],
    queryFn: () => getCatImages(10, breedId)
  });

  const breedName = catBreeds[0]?.breeds[0]?.name ?? "Cat";

  let content = null;
  if (isFetching) content = <CenteredText text="Loading cat breed images..." />;

  if (catBreeds.length > 0) {
    content = (
      <div className="flex-container">
        <div className="flex-grid">
          {catBreeds.map(({ id, url }) => (
            <CatImageCard
              breedId={breedId ?? ""}
              className="cursor-pointer"
              key={id}
              id={id}
              url={url}
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError)
    content = (
      <CenteredText text="There was an error while fetching the cat breed images." />
    );

  return (
    <Modal
      size="large"
      title={`${breedName} Breed Images`}
      onModalClose={() => navigate(`/${routes.catBreeds.path}`)}>
      {content}
    </Modal>
  );
}
