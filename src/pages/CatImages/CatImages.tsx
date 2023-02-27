import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";

import { Button, CatImageCard, CenteredText } from "../../components";
import { getCatImages } from "../../api";
import { queryKeys } from "../../constants";

export default function CatImages() {
  const [limit, setLimit] = useState(10);

  const { data: catImages, isPlaceholderData } = useQuery({
    queryKey: [queryKeys.catImages, limit],
    queryFn: () => getCatImages(limit),
    placeholderData: [],
    staleTime: Infinity
  });

  const handleLoadMoreClick = useCallback(
    () => setLimit((prevLimit) => prevLimit + 10),
    []
  );

  let content = null;
  if (isPlaceholderData)
    content = <CenteredText text="Loading cat images..." />;

  if (catImages && catImages.length > 0 && !isPlaceholderData)
    content = (
      <div className="flex-container">
        <div className="flex-grid">
          {catImages?.map(({ id, url }) => (
            <CatImageCard
              className="cursor-pointer"
              key={id}
              id={id}
              url={url}
            />
          ))}
        </div>
        <Button onClick={handleLoadMoreClick}>Load more</Button>
      </div>
    );

  if (!catImages && !isPlaceholderData)
    content = (
      <CenteredText text="There was an error while fetching the cat images." />
    );

  return (
    <>
      {content} <Outlet />
    </>
  );
}
