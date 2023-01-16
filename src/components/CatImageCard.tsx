import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FilledStaredIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";

import Image from "./Image";
import { Breed } from "../models";
import { routes } from "../routes";
import { getFavouriteCatImages } from "../api";

interface CatImageCardProps {
  breeds?: Breed[] | [];
  id: string;
  onIconClick?: () => void;
  responsive?: boolean;
  url: string;
}

export default memo(function CatImageCard({
  breeds = [],
  id,
  onIconClick,
  responsive = true,
  url
}: CatImageCardProps) {
  const navigate = useNavigate();

  const { data: favouriteCatImages, isLoading } = useQuery({
    queryKey: ["favouriteCatImages"],
    queryFn: getFavouriteCatImages,
    enabled: !responsive,
    staleTime: 60000
  });

  const isImageFavourite = favouriteCatImages?.find(
    ({ image_id: imageId }) => imageId === id
  );

  const handleImageClick = () => navigate(`/${routes.catImages.path}/${id}`);

  const handleIconClick = () => {
    if (isImageFavourite) return;
    onIconClick && onIconClick();
  };

  const responsiveWidth = responsive ? "md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" : "";

  const FavouriteIcon = isImageFavourite ? FilledStaredIcon : StarIcon;

  const favouriteIconTitle = isImageFavourite
    ? "Favorite image"
    : "Mark as favourite";

  return (
    <div
      className={`my-1 px-1 w-full ${responsiveWidth}`}
      onClick={handleImageClick}>
      <article className="overflow-hidden rounded-lg shadow-lg">
        <Image
          className="block w-full img-height object-cover"
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

            {isLoading ? (
              "Loading..."
            ) : (
              <FavouriteIcon
                className={`h-6 w-6 ${!isImageFavourite && "cursor-pointer"}`}
                onClick={handleIconClick}
                title={favouriteIconTitle}
              />
            )}
          </footer>
        )}
      </article>
    </div>
  );
});
