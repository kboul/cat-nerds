import { rest } from "msw";

import { searchUrl } from "../api/urls";
import { catImages } from "./mockData";

export const handlers = [
  rest.get(`${searchUrl}?limit=10`, (_, res, ctx) => res(ctx.json(catImages)))
];
