import { Breed, Image } from "../models";
import { Favourite } from "../models";
import { catImageUrl, favouriteUrl, catImagesUrl, catBreedsUrl } from "./urls";

const headers = {
  "x-api-key": process.env.REACT_APP_CAT_API_KEY ?? "",
  "Content-Type": "application/json"
};

const getCatImages = async (
  limit: number,
  breedId?: string
): Promise<Image[]> => {
  let endpoint = `${catImagesUrl}?limit=${limit}`;
  endpoint = breedId ? `${endpoint}&breed_ids=${breedId}` : endpoint;

  return fetch(endpoint, {
    method: "GET",
    headers
  }).then((res) => res.json());
};

const getCatImage = async (imageId: string): Promise<Image> =>
  fetch(`${catImageUrl}/${imageId}`, {
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

const getCatBreeds = async (): Promise<Breed[]> =>
  fetch(catBreedsUrl, {
    method: "GET",
    headers
  }).then((res) => res.json());

const getBreedDetails = async (breedId: string): Promise<Breed> =>
  fetch(`${catBreedsUrl}/${breedId}`, {
    method: "GET",
    headers
  }).then((res) => res.json());

export {
  getBreedDetails,
  getCatImages,
  getCatImage,
  getFavouriteCatImages,
  favouriteCatImage,
  removeFavouriteCatImage,
  getCatBreeds
};
