import { useQuery } from "@tanstack/react-query";
import { getFavouriteCatImages } from "../../api";
import { CatImageCard, CenteredText } from "../../components";

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
      <>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
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
      </>
    );

  if (isError)
    content = (
      <CenteredText text="There was an error while fetching the favourite cats." />
    );

  return content;
}
