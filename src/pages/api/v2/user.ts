import { NextApiResponse } from "next";
import { parseToken } from "../../../lib/parseToken";
import prisma from "../../../lib/prisma";
import { defaultApiHandler } from "../../../service/handler";
import { LoggerRequest } from "../../../service/log";

const user = async (req: LoggerRequest, res: NextApiResponse) => {
  const token = parseToken(req.headers.authorization);
  try {
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
  } catch (e) {
    req.logger.error(e);
  }
};

const handler = defaultApiHandler().get(user);

export default handler;
