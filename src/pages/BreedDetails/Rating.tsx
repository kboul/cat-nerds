import { StarIcon } from "@heroicons/react/24/solid";

import { dynamicNumberArray } from "./utils";

interface RatingProps {
  count: number;
}

export default function Rating({ count }: RatingProps) {
  if (count === 0) return <>-</>;

  const createStars = (count: number) => {
    return dynamicNumberArray(count).map((_, i) => (
      <StarIcon className="h-5 w-5" key={i} />
    ));
  };

  return <div className="flex flex-row">{createStars(count)}</div>;
}
