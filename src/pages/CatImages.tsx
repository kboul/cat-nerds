import { useQuery } from "@tanstack/react-query";

import { getCatImages } from "../api/cats";
import { CenteredText } from "../components";
import Card from "../components/Card";

export default function CatImages() {
  const {
    isFetching,
    isError,
    data: catImages
  } = useQuery({
    initialData: [],
    queryKey: ["catImages"],
    queryFn: getCatImages
  });

  let content = null;
  if (isFetching) content = <CenteredText text="Loading cat images..." />;

  if (catImages.length > 0)
    content = (
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {catImages.map(({ id, url }) => (
            <Card key={id} url={url} />
          ))}
        </div>
      </div>
    );

  if (isError)
    content = (
      <CenteredText text="There was an error while fetching the cat images." />
    );

  return content;
}
