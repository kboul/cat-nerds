import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FilledStaredIcon } from "@heroicons/react/24/solid";

import Image from "./Image";
import { Breed } from "../models";
import { routes } from "../routes";
import { useFavouriteImagesQuery } from "../hooks";

interface CatImageCardProps {
  breedId?: string;
  breeds?: Breed[] | [];
  className?: string;
  clickableCard?: boolean;
  id: string;
  onIconClick?: () => void;
  responsive?: boolean;
  showDetails?: boolean;
  url: string;
}

export default memo(function CatImageCard({
  breedId,
  breeds = [],
  className,
  clickableCard = true,
  id,
  onIconClick,
  responsive = true,
  showDetails = false,
  url
}: CatImageCardProps) {
  const navigate = useNavigate();

  const { data: favouriteCatImages, isLoading } = useFavouriteImagesQuery({
    staleTime: 60000
  });

  const isImageFavourite = favouriteCatImages?.find(
    ({ image_id: imageId }) => imageId === id
  );

  const handleImageClick = () => {
    if (!clickableCard) return;
    if (!breedId) navigate(`/${routes.catImages.path}/${id}`);
    if (breedId) navigate(`/${routes.breedDetails.path}/${breedId}`);
  };

  const handleIconClick = () => {
    if (!showDetails) return;
    onIconClick && onIconClick();
  };

  const responsiveWidth = responsive ? "md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" : "";

  const FavouriteIcon = isImageFavourite ? FilledStaredIcon : StarIcon;

  const favouriteIconTitle = isImageFavourite
    ? "Favourite image"
    : "Mark as favourite";

  const handleBreedNameClick = (breedId: string) => () =>
    navigate(`/${routes.breedDetails.path}/${breedId}`);

  return (
    <div className={`my-1 px-1 w-full ${responsiveWidth}`}>
      <article className="overflow-hidden rounded-lg shadow-lg">
        <div onClick={handleImageClick}>
          <Image
            className={`block w-full img-height object-cover ${className}`}
            placeholderImg="/loadingImage.png"
            src={url}
          />
        </div>

        {showDetails && (
          <div className="flex items-center justify-between leading-none p-2 md:p-4">
            <div className="flex flex-1 items-center no-underline hover:underline text-black">
              {breeds?.length > 0 && (
                <p
                  className="ml-2 text-sm cursor-pointer"
                  onClick={handleBreedNameClick(breeds[0].id)}>
                  {breeds[0].name} breed
                </p>
              )}
            </div>

            {isLoading ? (
              "Loading..."
            ) : (
              <FavouriteIcon
                aria-label={isImageFavourite ? "filledStaredIcon" : "starIcon"}
                className={`h-6 w-6 ${
                  (!isImageFavourite || !clickableCard) && "cursor-pointer"
                }`}
                onClick={handleIconClick}
                title={favouriteIconTitle}
              />
            )}
          </div>
        )}
      </article>
    </div>
  );
});
