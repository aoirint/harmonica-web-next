# harmonica-web-next

自宅センサーモニターHarmonicaのNext.js製Webフロントエンドアプリ。

![](docs/screenshot_monitor.jpg)


## Development

- Node 18
- npm 8
- (Recommended) nvm: <https://github.com/nvm-sh/nvm>

```shell
nvm use

npm ci

npm run codegen -- --watch

npm run dev
```

## Deployment

```shell
npm ci

npm run build

rsync -av --delete out/ /path/to/
```
