import { getUser } from "../../user/id";
import { NextApiResponse } from "next";
import { createToken } from "../../team/token";
import nc from "next-connect";
import { RequestWithSession, sessionMiddleWare } from "../../session";
import is from "@sindresorhus/is";
import { findTeam } from "../../team/findTeam";

const handler = nc<RequestWithSession, NextApiResponse>()
  .use(sessionMiddleWare())
  .post(async (req, res) => {
    const teamId = req.body.name;
    if (!teamId || !is.nonEmptyObject(req.user)) {
      res.status(400).send("Please Provide valid team id");
    } else {
      const user = await getUser(req.user.email);
      const team = await findTeam({ teamId, email: req.user.email });
      if (user && team) {
        const token = await createToken({ teamId, userId: user.id });
        res.json({
          token,
        });
      }
    }
  });

export default handler;
