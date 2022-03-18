import { NextApiHandler } from "next";

const handler: NextApiHandler = async (_, res) => {
  res.json({
    teams: [],
  });
};

export default handler;
