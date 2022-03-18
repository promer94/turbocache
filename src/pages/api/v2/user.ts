import { NextApiHandler } from "next";
import { findToken } from "../../../team/token";

const parseToken = (token: string | undefined) =>
  token ? token.replace("Bearer ", "") : "";

const handler: NextApiHandler = async (req, res) => {
  const token = parseToken(req.headers.authorization);
  const info = await findToken(token);
  res.json({
    user: {
      id: `team_${info?.teamId}`,
      name: info?.user.name,
      email: info?.user.email,
    },
  });
};

export default handler;
