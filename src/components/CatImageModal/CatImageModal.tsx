import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

import Modal from "../Modal";
import CatImageCard from "../CatImageCard";
import CenteredText from "../CenteredText";
import { favouriteCatImage, getCatImage } from "../../api";
import { routes } from "../../routes";
import { queryClient } from "../../queryClient";
import { queryKeys } from "../../constants";

export default function CatImageModal() {
  const { imageId } = useParams();
  const navigate = useNavigate();

  const {
    isFetching,
    isError,
    data: catImage
  } = useQuery({
    queryKey: [queryKeys.catImage, imageId],
    queryFn: () => getCatImage(imageId ?? ""),
    enabled: !!imageId,
    staleTime: 60000 // 1min
  });

  const { mutate } = useMutation(favouriteCatImage, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [queryKeys.favouriteCatImages]
      })
  });

  const handleIconClick = useCallback(() => {
    if (imageId) mutate(imageId);
  }, [mutate, imageId]);

  const memoedBreeds = useMemo(() => catImage?.breeds, [catImage?.breeds]);

  let content = null;
  if (isFetching)
    content = <CenteredText isModal text="Loading cat image..." />;

  if (catImage)
    content = (
      <CatImageCard
        breeds={memoedBreeds}
        id={catImage.id}
        onIconClick={handleIconClick}
        responsive={false}
        showDetails
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
