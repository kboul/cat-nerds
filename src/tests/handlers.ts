import { rest } from "msw";

import { catBreedsUrl, catImagesUrl, catImageUrl, favouriteUrl } from "../api";
import {
  catImages,
  catImage,
  favouriteCatImages,
  loadMoreCatImages,
  catBreedImages,
  catBreeds,
  aegeanBreed
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
  }),
  rest.get(catBreedsUrl, (_, res, ctx) => res(ctx.json(catBreeds))),
  rest.get(catBreedsUrl, (req, res, ctx) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const breedId = req.url.searchParams.get("breedId");
    return res(ctx.json(aegeanBreed));
  })
];
