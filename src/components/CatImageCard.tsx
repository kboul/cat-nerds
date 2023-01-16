import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";

import { routes } from "../routes";

import Image from "./Image";
import { Breed } from "../models";

interface CatImageCardProps {
  breeds?: Breed[] | [];
  id: string;
  responsive?: boolean;
  url: string;
}

export default memo(function CatImageCard({
  breeds = [],
  id,
  responsive = true,
  url
}: CatImageCardProps) {
  const navigate = useNavigate();

  const handleImageClick = () => navigate(`/${routes.catImages.path}/${id}`);

  const responsiveWidth = responsive ? "md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" : "";

  return (
    <div
      className={`my-1 px-1 w-full ${responsiveWidth}`}
      onClick={handleImageClick}>
      <article className="overflow-hidden rounded-lg shadow-lg">
        <Image
          className="block w-full h-[350px] object-cover"
          placeholderImg="/loadingImage.png"
          src={url}
        />

        {!responsive && (
          <footer className="flex items-center justify-between leading-none p-2 md:p-4">
            <div className="flex flex-1 items-center no-underline hover:underline text-black">
              {breeds?.length > 0 && (
                <p className="ml-2 text-sm">{breeds[0].name} cat</p>
              )}
            </div>

            <StarIcon className="h-6 w-6" />
          </footer>
        )}
      </article>
    </div>
  );
});
