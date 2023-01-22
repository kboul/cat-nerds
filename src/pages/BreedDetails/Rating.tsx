import { StarIcon } from "@heroicons/react/24/solid";

interface RatingProps {
  count: number;
}

export default function Rating({ count }: RatingProps) {
  if (count === 0) return <p>-</p>;

  const createStars = (count: number) =>
    Array(Number(count))
      .fill(undefined)
      .map((_, i) => i)
      .map((_, i) => <StarIcon className="h-5 w-5" key={i} />);

  return <div className="flex flex-row">{createStars(count)}</div>;
}
