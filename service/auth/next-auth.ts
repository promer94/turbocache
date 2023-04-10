import NextAuth, { getServerSession, NextAuthOptions, Session } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '~/service/db/prisma'
import * as z from 'zod'
import { NextApiRequest, NextApiResponse } from 'next'
import is from '@sindresorhus/is'

interface TurboSession extends Session {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
    id?: string | null
  }
}
export const SessionSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    image: z.string(),
  }),
  expires: z.optional(z.string()),
})

const option = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  pages: {
    newUser: '/api/v1/onboarding',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore
        session.user.id = token.userId
      }
      return session as TurboSession
    },
  },
} satisfies NextAuthOptions

export const getSession = async (
  ...args: [] | [NextApiRequest, NextApiResponse]
) => {
  const params:
    | [NextApiRequest, NextApiResponse, typeof option]
    | [typeof option] = is.nonEmptyArray(args) ? [...args, option] : [option]
  const session = await getServerSession(...params)
  const result = SessionSchema.parse(session)
  return result
}

const NextAuthHandler = NextAuth(option)
export default NextAuthHandler
