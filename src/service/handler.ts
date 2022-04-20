import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { loggerMiddleware } from "./log";

export const defaultApiHandler = () =>
  nc<NextApiRequest, NextApiResponse>().use(loggerMiddleware());
