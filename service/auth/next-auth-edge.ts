import NextAuth, { getServerSession, NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '~/service/db/prisma'

const option: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    newUser: '/api/onboarding',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
export const getSession = (
) => {
  return getServerSession(option)
}
const NextAuthHandler = NextAuth(option)
