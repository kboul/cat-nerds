import { rest } from "msw";

import { catImagesUrl } from "../api";
import { catImages } from "./mockData";

export const handlers = [
  rest.get(`${catImagesUrl}?limit=10`, (_, res, ctx) =>
    res(ctx.json(catImages))
  )
];
