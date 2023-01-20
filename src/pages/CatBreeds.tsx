import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCatBreeds } from "../api";
import { CenteredText } from "../components";

import { queryKeys } from "../constants";

export default function CatBreeds() {
  const {
    data: catBreeds,
    isFetching,
    isError
  } = useQuery({
    queryKey: [queryKeys.catBreeds],
    queryFn: getCatBreeds,
    initialData: []
  });
  const [selectedBreed, setSelectedBreed] = useState("");

  let content = null;
  if (isFetching) content = <CenteredText text="Loading cat breeds..." />;

  if (catBreeds.length > 0) {
    const handleBreedClick = (name: string) => () => setSelectedBreed(name);

    content = (
      <div className="flex items-center justify-center ">
        <ul className="bg-white rounded-lg border border-gray-200 text-gray-900 md:columns-4 sm:columns-1 sm:mb-10 md:mb-0">
          {catBreeds.map(({ id, name }) => (
            <li
              className={`px-6 py-2 sm:border-b sm:border-gray-200 md:border-none cursor-pointer ${
                selectedBreed === name ? "font-bold" : "font-normal"
              }`}
              onClick={handleBreedClick(name)}
              key={id}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (isError)
    content = (
      <CenteredText text="There was an error while fetching the cat breeds." />
    );

  return content;
}
