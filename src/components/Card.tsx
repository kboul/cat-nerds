import { memo } from "react";

import Image from "./Image";

interface CardProps {
  url: string;
}

export default memo(function Card({ url }: CardProps) {
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <Image
          className="block w-full h-48 object-cover"
          placeholderImg="/loadingImage.png"
          src={url}
        />
      </article>
    </div>
  );
});
