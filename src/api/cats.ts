import { CatImage } from "../models";
import { Favourite } from "../models";
import { catImageUrl, favouriteUrl, catImagesUrl } from "./urls";

const headers = {
  "x-api-key": process.env.REACT_APP_CAT_API_KEY ?? "",
  "Content-Type": "application/json"
};

const getCatImages = async (limit: number): Promise<CatImage[]> =>
  fetch(`${catImagesUrl}?limit=${limit}`, {
    method: "GET",
    headers
  }).then((res) => res.json());

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

export { getCatImages, getCatImage, getFavouriteCatImages, favouriteCatImage };
