import { NextApiHandler } from "next";
import { parseToken } from '../../../lib/parseToken';
import prisma from "../../../lib/prisma";
import { defaultApiHandler } from '../../../service/handler';


const user: NextApiHandler = async (req, res) => {
  const token = parseToken(req.headers.authorization);
  const info = await prisma.turboToken.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });
  if (!info) {
    res.status(401).end("Unauthorized");
  } else {
    res.json({
      user: {
        id: `team_${info.user.id}`,
        name: info.user.name,
        email: info.user.email,
      },
    });
  }
};

const handler = defaultApiHandler().all(user);

export default handler;
