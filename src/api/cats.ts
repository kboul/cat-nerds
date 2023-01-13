import { CatImage } from "../models";

const baseUrl = "https://api.thecatapi.com/v1/images/search";

const getCatImages = async (): Promise<CatImage[]> =>
  fetch(`${baseUrl}?limit=10`, {
    method: "GET",
    headers: { "x-api-key": process.env.REACT_APP_CAT_API_KEY ?? "" }
  }).then((res) => res.json());

export { getCatImages };
