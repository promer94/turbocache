import is from "@sindresorhus/is";
import { NextApiRequest } from "next";

export const parseToken = (token: string | undefined) =>
  token ? token.replace("Bearer ", "") : "";
export const parseTeam = (team: unknown) =>
  is.nonEmptyString(team) ? team.replace("team_", "") : "";
/**
 *
 * Get authorization and teamId from request
 */
export const parseRequest = (req: NextApiRequest) => {
  const authorization = parseToken(req.headers.authorization);
  const teamId = parseTeam(req.query.teamId);
  return {
    authorization,
    teamId,
  };
};
