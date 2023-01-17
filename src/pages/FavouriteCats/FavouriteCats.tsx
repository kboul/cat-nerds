import { useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { CatImageCard, CenteredText } from "../../components";
import { getFavouriteCatImages, removeFavouriteCatImage } from "../../api";
import { queryClient } from "../../queryClient";
import { queryKeys } from "../../constants";

export default function FavouriteCats() {
  const {
    data: favouriteCatImages,
    isFetching,
    isError
  } = useQuery({
    queryKey: [queryKeys.favouriteCatImages],
    queryFn: getFavouriteCatImages,
    initialData: []
  });

  const { mutate } = useMutation(removeFavouriteCatImage, {
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [queryKeys.favouriteCatImages]
      })
  });

  const handleIconClick = useCallback(
    (favouriteId: number) => mutate(favouriteId),
    [mutate]
  );

  let content = null;
  if (isFetching) content = <CenteredText text="Loading favourite cats..." />;

  if (favouriteCatImages.length > 0)
    content = (
      <div className="flex-container">
        <div className="flex-grid">
          {favouriteCatImages.map(({ id, image }) => (
            <CatImageCard
              clickableCard={false}
              id={image.id}
              key={id}
              onIconClick={() => handleIconClick(id)}
              url={image.url}
            />
          ))}
        </div>
      </div>
    );

  if (isError)
    content = (
      <CenteredText text="There was an error while fetching the favourite cats." />
    );

  return content;
}
