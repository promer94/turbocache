import is from "@sindresorhus/is";
import { NextApiResponse } from "next";
import prisma from "../../../../lib/prisma";
import { defaultApiHandler } from "../../../../service/handler";
import {
  TokenRequst,
  turboTokenMiddleWare,
} from "../../../../service/turbo-cache";

const hanlder = defaultApiHandler()
  .use(turboTokenMiddleWare())
  .post<TokenRequst, NextApiResponse>(async (req, res) => {
    try {
      if (is.nonEmptyArray(req.body)) {
        await prisma.eventItem.createMany({
          data: (req.body as any).map((v: any) => ({
            ...v,
            userId: req.userId,
            teamId: req.teamId,
          })),
        });
      }
    } catch (e) {
      req.logger.error(e);
    }

    res.status(200).send("");
  });

export default hanlder;
