import NextAuth, { unstable_getServerSession as getServerSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from './prisma';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { logger } from './logger';

const option: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    newUser: "/api/onboarding",
  },
  secret: process.env.NEXTAUTH_SECRET
};
export const serverSession = (
  context:
    | GetServerSidePropsContext
    | {
        req: NextApiRequest;
        res: NextApiResponse;
      }
) => {
  return getServerSession(context.req, context.res, option);
}
const NextAuthHandler = NextAuth(option);
export default NextAuthHandler
