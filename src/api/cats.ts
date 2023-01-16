import { CatImage } from "../models";
import { baseUrl, searchUrl } from "./urls";

const headers = { "x-api-key": process.env.REACT_APP_CAT_API_KEY ?? "" };

const getCatImages = async (limit: number): Promise<CatImage[]> =>
  fetch(`${searchUrl}?limit=${limit}`, {
    method: "GET",
    headers
  }).then((res) => res.json());

const getCatImage = async (catImageId: string): Promise<CatImage> =>
  fetch(`${baseUrl}/${catImageId}`, {
    method: "GET",
    headers
  }).then((res) => res.json());

export { getCatImages, getCatImage };
