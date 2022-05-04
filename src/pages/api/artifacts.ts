import { sessionMiddleWare, UserRequest } from "../../service/session";
import { defaultApiHandler } from "../../service/handler";
import { NextApiResponse } from "next";
import { s3Storage } from "../../lib/s3-client";
import { Artifact } from "../../types";

const handler = defaultApiHandler()
  .use(sessionMiddleWare())
  /**
   * GET /api/artifacts
   * List artifacts (of a user's default team)
   */
  .get<UserRequest, NextApiResponse>(async (req, res) => {
    const { id } = req.user;
    const artifacts: Artifact[] =
      (await s3Storage.list(id))
        // Order by last modified time desc
        ?.sort(
          (o1, o2) => o2.LastModified!.valueOf() - o1.LastModified!.valueOf()
        )
        .map((_object) => {
          return {
            hash: _object.Key!.replace(new RegExp("^" + id + "\\/"), ""),
            size: _object.Size!,
            createdAt: _object.LastModified?.toISOString() ?? null,
          };
        }) ?? [];

    res.json({
      artifacts,
    });
  });

export default handler;
