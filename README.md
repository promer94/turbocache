<div align="center">
  <h1 align="center">Turbocache</h3>
</div>

## About The Project

Turbocache is an open-source remote cache server for [Turborepo](https://turborepo.org/docs/core-concepts/remote-caching). It's only built for learning purpose and demostration. **_For production work, you should use vercel's offcial remote cache server._**

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fpromer94%2Fturbocache&env=DATABASE_URL,AWS_ACCESSKEY_ID,AWS_ACCESSKEY_TOKEN,AWS_S3_BUCKET,AWS_S3_REGION,NEXTAUTH_SECRET,NEXTAUTH_URL,GITHUB_ID,GITHUB_SECRET&project-name=my-turbocache&repo-name=my-turbocache)

## Getting Started

### Get Environment Variables

rename .env.example.local to .env.local

```
# Get this from PlantScale
# Tutorial https://www.youtube.com/watch?v=Sx4pFi0je5w
DATABASE_URL=

# AWS S3 Config
AWS_ACCESSKEY_ID=
AWS_ACCESSKEY_TOKEN=
AWS_S3_BUCKET=
AWS_S3_REGION=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Github Oauth
# Tutorial: https://www.youtube.com/watch?v=zvoW8SM-wns
GITHUB_SECRET=
GITHUB_ID=
```

### Installation

```bash
pnpm install
```

### Setup mysql (optional)

```bash
docker run --name mysql -d -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 arm64v8/mysql:oracle
```

### Setup minio (optional)

```bash
docker run \
   -d \
   -p 9000:9000 \
   -p 9001:9001 \
   --name minio \
   -e "MINIO_ROOT_USER=AKIAIOSFODNN7EXAMPLE" \
   -e "MINIO_ROOT_PASSWORD=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" \
   quay.io/minio/minio server /data --console-address ":9001"
```

### Setup butket for minin (optional)

```bash
pnpm bucket
```

### Setup Database

```bash
pnpx prisma db push
```

### Generate Prisma Client

```bash
pnpx prisma generate
```

### Development

```bash
pnpm dev
```

### Deployment

```bash
pnpm deploy
```

## Built With

- [Next.js](https://nextjs.org)

- [Prsima](https://www.prisma.io)

- [PlantScale](https://planetscale.com)

- [NextAuth](https://next-auth.js.org)

- [AWS S3](https://aws.amazon.com/s3)

- [Vercel](https://vercel.com)

---

[![Vercel](./public/powered-by-vercel.svg)](https://vercel.com?utm_source=promer94&utm_campaign=oss)
