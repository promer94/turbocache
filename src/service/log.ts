import { NextApiRequest, NextApiResponse } from "next";
import { Middleware } from "next-connect";
import { Logger } from 'pino';
import { logger } from "../lib/logger";

export interface LoggerRequest extends NextApiRequest {
  logger: Logger;
}

const loggerMiddleware: () => Middleware<LoggerRequest, NextApiResponse> =
  () => async (req, res, next) => {
    req.logger = logger.child({ scpoe: 'API' })
    const time = Date.now();
    const logTime = () => {
      const finish = Date.now();
      const responseTime = finish - time;
      req.logger.trace({
        responseTime, req: {
          method: req.method,
          url: req.url,
          headers: req.headers,
        },
        res: {
          statusCode: res.statusCode,
          headers: res.getHeaders(),
        }
      }, 'Response Time');
    };
    res.once("close", logTime);
    next();
  };

export { loggerMiddleware };
