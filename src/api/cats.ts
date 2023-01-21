import { CatBreed, CatImage } from "../models";
import { Favourite } from "../models";
import { catImageUrl, favouriteUrl, catImagesUrl, catBreedsUrl } from "./urls";

const headers = {
  "x-api-key": process.env.REACT_APP_CAT_API_KEY ?? "",
  "Content-Type": "application/json"
};

const getCatImages = async (
  limit: number,
  catBreedId?: string
): Promise<CatImage[]> => {
  let endpoint = `${catImagesUrl}?limit=${limit}`;
  endpoint = catBreedId ? `${endpoint}&breed_ids=${catBreedId}` : endpoint;

  return fetch(endpoint, {
    method: "GET",
    headers
  }).then((res) => res.json());
};

const getCatImage = async (catImageId: string): Promise<CatImage> =>
  fetch(`${catImageUrl}/${catImageId}`, {
    method: "GET",
    headers
  }).then((res) => res.json());

const getFavouriteCatImages = async (): Promise<Favourite[]> =>
  fetch(`${favouriteUrl}?sub_id=kboul`, {
    method: "GET",
    headers
  }).then((res) => res.json());

const favouriteCatImage = async (
  imageId: string
): Promise<{ id: number; message: string }> =>
  fetch(favouriteUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({ image_id: imageId, sub_id: "kboul" })
  }).then((res) => res.json());

const removeFavouriteCatImage = async (
  favouriteId: number
): Promise<{ message: string }> =>
  fetch(`${favouriteUrl}/${favouriteId}`, {
    method: "DELETE",
    headers
  }).then((res) => res.json());

const getCatBreeds = async (): Promise<CatBreed[]> =>
  fetch(`${catBreedsUrl}`, {
    method: "GET",
    headers
  }).then((res) => res.json());

export {
  getCatImages,
  getCatImage,
  getFavouriteCatImages,
  favouriteCatImage,
  removeFavouriteCatImage,
  getCatBreeds
};
