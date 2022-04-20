import { NextApiHandler } from "next";
import { defaultApiHandler } from '../../../service/handler';

const teams: NextApiHandler = async (_, res) => {
  res.json({
    teams: [],
  });
};

const handler = defaultApiHandler().all(teams);

export default handler;
