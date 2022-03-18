import { createTeam } from "../../team/createTeam";
import { getUser } from "../../user/id";
import { NextApiResponse } from "next";
import { RequestWithSession, sessionMiddleWare } from "../../session";
import nc from "next-connect";

const onBorad = async ({ email, name }: { email: string; name: string }) => {
  const userId = await getUser(email);
  return createTeam({ name, userId: userId?.id! });
};

interface Req extends RequestWithSession {
  user: {
    name: string;
    email: string;
  };
}
const handler = nc<RequestWithSession, NextApiResponse>()
  .use(sessionMiddleWare())
  .get<Req>(async (req, res) => {
    await onBorad({ ...req.user });
    res.redirect("/turborepo/welcome");
  });

export default handler;
