import { useQuery } from "@tanstack/react-query";
import { Outlet, useNavigate } from "react-router-dom";

import { CenteredText } from "../../components";
import { getCatBreeds } from "../../api";
import { queryKeys } from "../../constants";
import { routes } from "../../routes";

export default function CatBreeds() {
  const navigate = useNavigate();

  const {
    data: catBreeds,
    isFetching,
    isError
  } = useQuery({
    queryKey: [queryKeys.catBreeds],
    queryFn: getCatBreeds,
    initialData: []
  });

  let content = null;
  if (isFetching) content = <CenteredText text="Loading cat breeds..." />;

  if (catBreeds.length > 0) {
    const handleBreedClick = (id: string) => () =>
      navigate(`/${routes.catBreeds.path}/${id}`);

    content = (
      <div className="flex items-center justify-center">
        <ul className="bg-white rounded-lg border border-gray-200 text-gray-900 md:columns-4 sm:columns-1 sm:mb-10 md:mb-0">
          {catBreeds.map(({ id, name }) => (
            <li
              className={`px-6 py-2 sm:border-b sm:border-gray-200 md:border-none cursor-pointer hover:font-bold`}
              onClick={handleBreedClick(id)}
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

  return (
    <>
      {content} <Outlet />
    </>
  );
}
