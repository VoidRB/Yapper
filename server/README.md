# Yapper Server

## Setup

```bash
deno run --allow-env --allow-read --allow-write --allow-net --allow-run --allow-plugin --watch server/src/server.ts
```

## Migrations

```bash
deno run --allow-env --allow-read --allow-write --allow-net --allow-run --allow-plugin server/db/migrations/index.ts
```

## Seeds (WIP)

```bash
deno run --allow-env --allow-read --allow-write --allow-net --allow-run --allow-plugin server/db/seeds/index.ts
```
