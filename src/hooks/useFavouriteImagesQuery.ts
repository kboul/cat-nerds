import { useQuery } from "@tanstack/react-query";
import { getFavouriteCatImages } from "../api";
import { queryKeys } from "../constants";

export default function useFavouriteImagesQuery(params?: Object) {
  return useQuery({
    queryKey: [queryKeys.favouriteCatImages],
    queryFn: getFavouriteCatImages,
    ...params
  });
}
