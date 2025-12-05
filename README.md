# harmonica-web-next

自宅センサモニターHarmonicaのNext.js製Webフロントエンドアプリ。

![](docs/screenshot_monitor.jpg)

## Development Environment

- Node 24
- pnpm 10

## Run the development server

```shell
pnpm install --frozen-lockfile
```

Create `.env.local` file.

```env
NEXT_PUBLIC_HASURA_URL=https://hasura.example.com
HASURA_ADMIN_SECRET=myadminsecretkey

NEXT_PUBLIC_SMOKEPING_NAMES=Ping MyTarget
NEXT_PUBLIC_SMOKEPING_URLS=https://smokeping.example.com
NEXT_PUBLIC_SMOKEPING_TARGETS=MyGroup.MyTarget
```

```shell
pnpm run codegen -- --watch

pnpm run dev
```

## Deployment

```shell
pnpm install --frozen-lockfile

pnpm run build

rsync -av --delete out/ /path/to/
```
