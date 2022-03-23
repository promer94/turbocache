import NextAuth, { getServerSession, NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from './prisma';
import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';

const option: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    signIn({ user }) {
      return user.email === "yixuanxu94@outlook.com";
    },
  },
  pages: {
    newUser: "/api/onboard",
  },
  secret: process.env.NEXTAUTH_SECRET
}
export const getSession = (
  context:
    | GetServerSidePropsContext
    | {
        req: NextApiRequest;
        res: NextApiResponse;
      }
) => getServerSession(context, option);
const NextAuthHandler = NextAuth(option);
export default NextAuthHandler
