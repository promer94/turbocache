<div align="center">
  <h1 align="center">Turbocache</h3>
</div>
## About The Project

Turbocache is an open-source remote cache server for [Turborepo](https://turborepo.org/docs/core-concepts/remote-caching). It's only built for learning purpose and demostration. ***For production work, you should use vercel's offcial remote cache server.***

## Deploy on vercel
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpromer94%2Fturbocache&env=DATABASE_URL,AWS_ACCESSKEY_ID,AWS_ACCESSKEY_TOKEN,AWS_S3_BUCKET,AWS_S3_REGION,NEXTAUTH_SECRET,NEXTAUTH_URL,GITHUB_ID,GITHUB_SECRET&project-name=my-turbocache&repo-name=my-turbocache)

### Built With

*   [Next.js](https://nextjs.org)

*   [Prsima](https://www.prisma.io)

*   [Planetscale](https://planetscale.com)

*   [AWS S3](https://aws.amazon.com/s3)

*   [Vercel](https://vercel.com)

### Getting Started

#### Get Environment Variables

rename .env.example.local to .env.local

```
# Get this from plantscale
DATABASE_URL=

# AWS S3 Config
AWS_ACCESSKEY_ID=
AWS_ACCESSKEY_TOKEN=
AWS_S3_BUCKET=
AWS_S3_REGION=

# Next-auth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Github Oauth
GITHUB_SECRET=
GITHUB_ID=
```
#### Setup and Running

```bash
pnpm install
```

* setup database
```bash
pnpx prisma migrate dev
```

* generate prisma client
```bash
pnpx prisma generate
```

```bash
pnpm dev
```


