/* eslint-disable @typescript-eslint/no-unused-vars */
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
    const subId = req.url.searchParams.get("sub_id");
    return res.once(ctx.json([]));
  }),
  rest.get(favouriteUrl, (req, res, ctx) => {
    const subId = req.url.searchParams.get("sub_id");
    return res(ctx.json(favouriteCatImages));
  }),
  rest.post(favouriteUrl, (req, res, ctx) => {
    const imageId = req.url.searchParams.get("image_id");
    const subId = req.url.searchParams.get("sub_id");
    return res(ctx.json({ id: 101298048, message: "SUCCESS" }));
  }),
  rest.delete(`${favouriteUrl}/101295958`, (_, res, ctx) =>
    res(ctx.json({ message: "SUCCESS" }))
  ),
  rest.get(catBreedsUrl, (_, res, ctx) => res(ctx.json(catBreeds))),
  rest.get(`${catBreedsUrl}/aege`, (_, res, ctx) => res(ctx.json(aegeanBreed))),
  rest.get(`${catBreedsUrl}/aegean`, (_, res, ctx) => res(ctx.json([])))
];
