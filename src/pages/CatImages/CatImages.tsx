import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";

import { getCatImages } from "../../api";
import { Button, CatImageCard, CenteredText } from "../../components";

export default function CatImages() {
  const [limit, setLimit] = useState(10);

  const {
    isFetching,
    isError,
    data: catImages
  } = useQuery({
    initialData: [],
    queryKey: ["catImages", limit],
    queryFn: () => getCatImages(limit)
  });

  const handleLoadMoreClick = useCallback(
    () => setLimit((prevLimit) => prevLimit + 10),
    []
  );

  let content = null;
  if (isFetching) content = <CenteredText text="Loading cat images..." />;

  if (catImages.length > 0)
    content = (
      <>
        <div className="container my-12 mx-auto px-4 md:px-12">
          <div className="flex flex-wrap -mx-1 lg:-mx-4 cursor-pointer">
            {catImages.map(({ id, url }) => (
              <CatImageCard key={id} id={id} showDetails={false} url={url} />
            ))}
          </div>
          <Button onClick={handleLoadMoreClick}>Load more</Button>
        </div>
      </>
    );

  if (isError)
    content = (
      <CenteredText text="There was an error while fetching the cat images." />
    );

  return (
    <>
      {content} <Outlet />
    </>
  );
}
