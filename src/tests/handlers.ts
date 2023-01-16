import { rest } from "msw";

import { catImagesUrl, catImageUrl } from "../api";
import { catImages, catImage, catImageId } from "./mockData";

export const handlers = [
  rest.get(`${catImagesUrl}?limit=10`, (_, res, ctx) =>
    res(ctx.json(catImages))
  ),
  rest.get(`${catImageUrl}/${catImageId}`, (_, res, ctx) =>
    res(ctx.json(catImage))
  )
];
