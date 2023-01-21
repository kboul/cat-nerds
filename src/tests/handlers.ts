import { rest } from "msw";

import { catImagesUrl, catImageUrl, favouriteUrl } from "../api";
import {
  catImages,
  catImage,
  favouriteCatImages,
  loadMoreCatImages,
  catBreedImages
} from "./mockData";

export const handlers = [
  rest.get(catImagesUrl, (req, res, ctx) => {
    const limit = req.url.searchParams.get("limit");
    const breedIds = req.url.searchParams.get("breed_ids");

    if (limit === "10" && breedIds) return res(ctx.json(catBreedImages));
    if (limit === "20") return res(ctx.json(loadMoreCatImages));
    return res(ctx.json(catImages));
  }),
  rest.get(`${catImageUrl}/6sn`, (_, res, ctx) => res(ctx.json(catImage))),
  rest.get(favouriteUrl, (req, res, ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const limit = req.url.searchParams.get("sub_id");
    return res(ctx.json(favouriteCatImages));
  })
];
