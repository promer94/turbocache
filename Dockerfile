# Install dependencies only when needed
FROM node:18-bullseye AS deps
WORKDIR /app
COPY pnpm-lock.yaml* ./
RUN yarn global add pnpm
RUN --mount=type=cache,target=/root/.local/share/pnpm/store pnpm fetch

FROM node:18-bullseye AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_OUTPUTSTANDALONE 1 
RUN yarn global add pnpm
RUN pnpm install --offline
RUN pnpm prebuild
RUN --mount=type=cache,target=/app/.next/cache pnpm build

FROM node:18-bullseye AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]