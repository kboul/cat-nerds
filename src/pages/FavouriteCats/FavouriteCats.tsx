import { useQuery } from "@tanstack/react-query";

import { CatImageCard, CenteredText } from "../../components";
import { getFavouriteCatImages } from "../../api";

export default function FavouriteCats() {
  const {
    data: favouriteCatImages,
    isFetching,
    isError
  } = useQuery({
    queryKey: ["favouriteCatImages"],
    queryFn: getFavouriteCatImages,
    initialData: []
  });

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
