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
  const { catBreedId } = useParams();

  const {
    isFetching,
    isError,
    data: catImages
  } = useQuery({
    initialData: [],
    queryKey: [queryKeys.catBreeds, catBreedId],
    queryFn: () => getCatImages(10, catBreedId)
  });

  let content = null;
  if (isFetching) content = <CenteredText text="Loading cat breed images..." />;

  if (catImages.length > 0) {
    content = (
      <div className="flex-container">
        <div className="flex-grid">
          {catImages.map(({ id, url }) => (
            <CatImageCard
              className="cursor-pointer"
              key={id}
              id={id}
              showDetails={false}
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
      title="Cat Breed Images"
      onModalClose={() => navigate(`/${routes.catBreeds.path}`)}>
      {content}
    </Modal>
  );
}
