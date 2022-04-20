import { Consola } from "consola";
import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";
import { logger } from "../lib/logger";

export interface LoggerRequest extends NextApiRequest {
  logger: Consola;
}

const loggerMiddleware: () => Middleware<LoggerRequest, NextApiResponse> =
  () => async (req, res, next) => {
    req.logger = logger;
    const time = Date.now();
    const logTime = () => {
      const finish = Date.now();
      const responseTime = finish - time;
      logger.info(`${req.method} ${req.url} responseTime: ${responseTime}`);
    };
    res.once("close", logTime);
    next();
  };

export { loggerMiddleware };
