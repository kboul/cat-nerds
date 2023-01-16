import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getCatImage } from "../api/cats";
import CatImageCard from "./CatImageCard";
import CenteredText from "./CenteredText";
import { routes } from "../routes";
import Modal from "./Modal";

export default function CatImageModal() {
  const { catImageId } = useParams();
  const navigate = useNavigate();

  const {
    isFetching,
    isError,
    data: catImage
  } = useQuery({
    queryKey: ["catImage", catImageId],
    queryFn: () => getCatImage(catImageId ?? ""),
    enabled: !!catImageId,
    staleTime: 60000 // 1min
  });

  let content = null;
  if (isFetching)
    content = <CenteredText isModal text="Loading cat image..." />;

  if (catImage)
    content = (
      <CatImageCard
        breeds={catImage.breeds}
        id={catImage.id}
        responsive={false}
        url={catImage.url}
      />
    );

  if (isError)
    content = (
      <CenteredText
        isModal
        text="There was an error while fetching the cat image."
      />
    );

  return (
    <Modal
      title="Cat Image & Breed"
      onModalClose={() => navigate(`/${routes.catImages.path}`)}>
      {content}
    </Modal>
  );
}
