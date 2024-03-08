# [stordahl.dev](https://stordahl.dev)

Built with [TypeScript](https://www.typescriptlang.org/), [Hono.js](https://hono.dev/), & [CloudFlare Workers](https://developers.cloudflare.com/workers/)

## Development

```shell
git clone https://github.com/stordahl/stordahldotdev.git
cd stordahldotdev
bun install && bun run dev
```

## Deploy

To deploy, you'll need 
1. a CF worker Secret named `GH_TOKEN` to be available in your worker
2. to be authenticated with [Wrangler](https://developers.cloudflare.com/workers/wrangler/)

```shell
bun run deploy
```
