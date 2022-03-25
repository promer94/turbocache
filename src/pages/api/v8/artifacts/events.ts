import is from '@sindresorhus/is';
import { NextApiResponse } from "next";
import nc from "next-connect";
import prisma from '../../../../lib/prisma';
import { TokenRequst, turboTokenMiddleWare } from '../../../../service/turbo-cache';

const hanlder = nc<TokenRequst, NextApiResponse>()
  .use(turboTokenMiddleWare())
  .post(async (req, res) => {
    if (is.nonEmptyArray(req.body)) {
      await prisma.eventItem.createMany({
        data: (req.body as any).map((v: any) => ({
          ...v,
          userId: req.userId,
          teamId: req.teamId,
        })),
      });
    }
    res.status(204).send("");
  });

export default hanlder;
