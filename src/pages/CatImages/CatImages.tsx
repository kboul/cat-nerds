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
        <Button onClick={handleLoadMoreClick}>Load more</Button>
      </div>
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
