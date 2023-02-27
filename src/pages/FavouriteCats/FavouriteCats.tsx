import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";

import { CatImageCard, CenteredText } from "../../components";
import { removeFavouriteCatImage } from "../../api";
import { queryClient } from "../../queryClient";
import { useFavouriteImagesQuery } from "../../hooks";
import { queryKeys } from "../../constants";
import { Favourite } from "../../models";

export default function FavouriteCats() {
  const { data: favouriteCatImages, isPlaceholderData } =
    useFavouriteImagesQuery();

  const { mutate } = useMutation(removeFavouriteCatImage, {
    onSuccess: (_, favouriteId) =>
      queryClient.setQueryData<Favourite[] | undefined>(
        [queryKeys.favouriteCatImages],
        (oldData) => oldData?.filter((oldImage) => favouriteId !== oldImage.id)
      )
  });

  const handleIconClick = useCallback(
    (favouriteId: number) => mutate(favouriteId),
    [mutate]
  );

  let content = null;
  if (isPlaceholderData)
    content = <CenteredText text="Loading favourite cats..." />;

  if (favouriteCatImages && favouriteCatImages.length > 0 && !isPlaceholderData)
    content = (
      <div className="flex-container">
        <div className="flex-grid">
          {favouriteCatImages?.map(({ id, image }) => (
            <CatImageCard
              clickableCard={false}
              id={image.id}
              key={id}
              onIconClick={() => handleIconClick(id)}
              showDetails
              url={image.url}
            />
          ))}
        </div>
      </div>
    );

  if (!favouriteCatImages && !isPlaceholderData)
    content = (
      <CenteredText text="There was an error while fetching favourite cat images." />
    );

  if (!isPlaceholderData && favouriteCatImages?.length === 0)
    content = (
      <CenteredText text="You have not selected any favourite cat images." />
    );

  return content;
}
