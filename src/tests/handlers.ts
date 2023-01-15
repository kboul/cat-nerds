import { rest } from "msw";

import { baseUrl } from "../api/baseUrl";
import { catImages } from "./mockData";

export const handlers = [
  rest.get(`${baseUrl}?limit=10`, (_, res, ctx) => res(ctx.json(catImages)))
];
