import { rest } from "msw";

import { catImagesUrl, catImageUrl, favouriteUrl } from "../api";
import { catImages, catImage } from "./mockData";

export const handlers = [
  rest.get(`${catImagesUrl}?limit=10`, (_, res, ctx) =>
    res(ctx.json(catImages))
  ),
  rest.get(`${catImageUrl}/6sn`, (_, res, ctx) => res(ctx.json(catImage))),
  rest.get(`${favouriteUrl}?sub_id=kboul`, (_, res, ctx) => res(ctx.json([])))
];
