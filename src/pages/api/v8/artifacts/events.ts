import { NextApiResponse } from "next";
import nc from "next-connect";

import {
  RequestWithTokenInfo,
  tokenInfoMiddleWare,
} from "../../../../team/token";
import is from "@sindresorhus/is";
import prisma from "../../../../lib/prisma";

const hanlder = nc<RequestWithTokenInfo, NextApiResponse>()
  .use(tokenInfoMiddleWare())
  .post(async (req, res) => {
    if (is.nonEmptyArray(req.body)) {
      await prisma.eventItem.createMany({
        data: (req.body as any).map((v: any) => ({
          ...v,
          userId: req.info.user.id,
          teamId: req.info.team.id,
        })),
      });
    }
    res.status(204).send("");
  });

export default hanlder;
