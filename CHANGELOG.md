# Changelog

All notable changes to this project are documented in this file.

This changelog follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
and uses the repository tags and merged pull requests as its source of truth.

## [Unreleased]

### Added

- Added repository-local [Agent Skills](.agents/skills/) and
  [root agent guidance](AGENTS.md) for future
  repository maintenance workflows. This preserves review, security,
  changelog, release-note, issue, gitignore, GitHub Actions, and worktree
  procedures inside the repository so later automation work can follow the same
  documented process ([#69]).

### Changed

- Updated Next.js incrementally from `16.1.1` to `16.2.6` to keep the
  application on current patch releases after [v0.5.2] ([#64], [#65], [#66]).
- Updated pnpm to `11.0.8` and documented Node 24 / pnpm 11 as the development
  environment. The workspace now uses pnpm supply-chain guardrails including a
  one-week `minimumReleaseAge`, `trustPolicy: no-downgrade`,
  `trustPolicyIgnoreAfter: 10080`, and explicit install-script allowlisting
  ([#67]).
- Updated direct dependency ranges and refreshed `pnpm-lock.yaml` after the
  pnpm 11 configuration change. The lockfile shrink is expected because the
  GraphQL Codegen update removes an older duplicated
  `@graphql-codegen` / Relay / Babel transitive branch ([#68]).
- Refreshed `.gitignore` from a pinned upstream
  [Node.gitignore template][node-gitignore-template] and kept
  project-specific ignores for generated work directories, agent worktrees,
  `.vercel/`, `next-env.d.ts`, and environment files ([#70]).

### Notes

- No release version or UTC release date has been selected for the changes
  above, so they remain under [Unreleased].

## [v0.5.2] - 2026-01-10 UTC

### Security

- Updated Next.js from `16.0.7` to `16.1.1` and React / React DOM from
  `19.2.1` to `19.2.3` as a security-oriented dependency refresh ([#60]).

### Changed

- Moved React type packages from runtime dependencies to dev dependencies while
  refreshing the Next.js and React lockfile graph ([#60]).

## [v0.5.1] - 2025-12-05 UTC

### Fixed

- Fixed an infinite redirect loop for unauthenticated users after the App
  Router migration by centralizing route checks in `useAuthRedirect`, replacing
  repeated page-level redirects, and using stable app-relative imports ([#59]).

## [v0.5.0] - 2025-12-05 UTC

### Security

- Updated Next.js to `14.1.1` to address [CVE-2024-34351] /
  [GHSA-fr5h-rqp8-mj6g], then continued through the Next.js 14 patch line to
  `14.2.21`, `14.2.26`, and `14.2.30` before the larger framework migration
  ([#35], [#43], [#46], [#47]).
- Updated transitive dependencies including `undici`, `cross-spawn`, `nanoid`,
  and `@babel/runtime` through Dependabot and dependency-maintenance pull
  requests in the release range after [v0.4.0] ([#40], [#41], [#42], [#44],
  [#45]).

### Changed

- Migrated the application from the Pages Router to the Next.js App Router.
  Page entry points moved under `src/app`, reusable UI and generated GraphQL
  code moved under `src`, and App Router-compatible layout, metadata, theme,
  Apollo provider, Chart.js, and dayjs setup modules were introduced ([#58]).
- Switched from npm to pnpm, replacing `package-lock.json` with
  `pnpm-lock.yaml`, adding `pnpm-workspace.yaml`, and updating documented
  install commands and CI setup ([#51]).
- Updated the application stack to newer Next.js, React, Node 24, and Material
  UI v7-era tooling, including a TypeScript `next.config.ts` and App
  Router-compatible Material UI integration ([#55], [#58]).
- Replaced ESLint with Biome for repository linting and formatting, including
  CI updates and code formatting across the TypeScript and TSX source tree
  ([#56]).

### Fixed

- Preserved the SmokePing graph image aspect ratio so dashboard layout changes
  do not distort latency graphs ([#57]).

### Removed

- Removed the legacy Pages Router structure, unused starter assets, npm lockfile,
  `.nvmrc`, `.npmrc`, and ESLint configuration as part of the pnpm, Biome, and
  App Router migration ([#51], [#55], [#56], [#58]).

## [v0.4.0] - 2024-09-12 UTC

### Changed

- Enabled trailing slash output for static deployment paths and adjusted monitor
  page navigation to use the trailing-slash login route ([#39]).
- Switched static export configuration from the deprecated `next export` script
  to `output: "export"` in `next.config.js`, keeping deployment aligned with
  supported Next.js configuration ([#38]).

## [v0.3.1] - 2024-09-12 UTC

### Changed

- Refreshed npm dependencies and `package-lock.json` via `npm update`, keeping
  the pre-pnpm dependency graph current after the [v0.3.0] feature release
  ([#37]).

## [v0.3.0] - 2024-03-28 UTC

### Added

- Added last light and CO2 value display to the monitor dashboard so current
  sensor readings are visible alongside chart history ([#34]).
- Added a GraphQL aggregate query for seven-day MH-Z19 CO2 data and calibration
  logic that assumes the seven-day minimum corresponds to 400 ppm, improving the
  displayed CO2 baseline for longer-running sensor data ([#32]).

### Removed

- Removed the unused dummy API route from the Next.js app ([#33]).

### Changed

- Updated dependencies shortly before the release, keeping the npm lockfile in
  step with the application changes ([#31]).

## [v0.2.0] - 2023-09-23 UTC

### Added

- Added the [GitHub Actions lint workflow](.github/workflows/lint.yml) so pull
  requests and main-branch changes run the project linter in CI ([#29]).

### Changed

- Updated the development runtime to Node 20 and npm 10, including README,
  `.nvmrc`, `package.json`, and npm lockfile updates ([#25], [#26]).
- Updated Next.js and `eslint-config-next` to `13.5.2`, along with broader npm
  dependency refreshes ([#27], [#28]).
- Hid the traffic chart and showed the humidity chart by default, moving the
  last humidity value into the humidity chart area to match the dashboard focus
  at the time ([#23]).

### Security

- Updated `graphql` from `16.6.0` to `16.8.1` and `semver` from `6.3.0` to
  `6.3.1` in dependency-maintenance commits leading into this release ([#22],
  [#24]).

## [v0.1.1] - 2023-07-25 UTC

### Added

- Added the initial Harmonica Web Dashboard implementation, including
  Hasura/Apollo authentication, generated GraphQL types, a login page, Material
  UI app shell, dark theme, and static-export deployment flow.
- Added monitor charts for light, humidity, temperature, CO2, network traffic,
  and SmokePing images, with a responsive 3x2 dashboard layout, chart units,
  legends/tooltips, and configurable graph duration ([#9], [#13], [#15]).
- Added automatic one-minute data refresh and a sixty-minute page reload to keep
  long-running dashboard sessions fresh ([#2], [#3]).
- Added sensor calibration and current-value display support for temperature and
  humidity, including offsets and decimal precision for the latest readings
  ([#16], [#17], [#18], [#19], [#20]).

### Changed

- Disabled Apollo cache for the monitor query so repeated refreshes read current
  sensor data instead of stale client-side cache entries ([#10]).
- Updated the project license from Apache License 2.0 to MIT after the initial
  license addition ([#1], [#12]).
- Updated the development toolchain to npm 9 during early project maintenance
  ([#11]).

### Security

- Updated vulnerable or security-sensitive dependencies including `word-wrap`,
  `json5`, `jsonwebtoken`, `@graphql-tools/prisma-loader`, `undici`,
  `ua-parser-js`, and `luxon` during early maintenance ([#4], [#5], [#6],
  [#7], [#8], [#21]).

[Unreleased]: https://github.com/aoirint/harmonica/compare/0.5.2...main
[v0.5.2]: https://github.com/aoirint/harmonica/releases/tag/0.5.2
[v0.5.1]: https://github.com/aoirint/harmonica/releases/tag/0.5.1
[v0.5.0]: https://github.com/aoirint/harmonica/releases/tag/0.5.0
[v0.4.0]: https://github.com/aoirint/harmonica/releases/tag/0.4.0
[v0.3.1]: https://github.com/aoirint/harmonica/releases/tag/0.3.1
[v0.3.0]: https://github.com/aoirint/harmonica/releases/tag/0.3.0
[v0.2.0]: https://github.com/aoirint/harmonica/releases/tag/0.2.0
[v0.1.1]: https://github.com/aoirint/harmonica/releases/tag/0.1.1
[CVE-2024-34351]: https://www.cve.org/CVERecord?id=CVE-2024-34351
[GHSA-fr5h-rqp8-mj6g]: https://github.com/advisories/GHSA-fr5h-rqp8-mj6g
[node-gitignore-template]: https://github.com/github/gitignore/blob/ca6c873762f926cdc361fbbc42d8357a45145ba2/Node.gitignore
[#1]: https://github.com/aoirint/harmonica/pull/1
[#2]: https://github.com/aoirint/harmonica/pull/2
[#3]: https://github.com/aoirint/harmonica/pull/3
[#4]: https://github.com/aoirint/harmonica/pull/4
[#5]: https://github.com/aoirint/harmonica/pull/5
[#6]: https://github.com/aoirint/harmonica/pull/6
[#7]: https://github.com/aoirint/harmonica/pull/7
[#8]: https://github.com/aoirint/harmonica/pull/8
[#9]: https://github.com/aoirint/harmonica/pull/9
[#10]: https://github.com/aoirint/harmonica/pull/10
[#11]: https://github.com/aoirint/harmonica/pull/11
[#12]: https://github.com/aoirint/harmonica/pull/12
[#13]: https://github.com/aoirint/harmonica/pull/13
[#15]: https://github.com/aoirint/harmonica/pull/15
[#16]: https://github.com/aoirint/harmonica/pull/16
[#17]: https://github.com/aoirint/harmonica/pull/17
[#18]: https://github.com/aoirint/harmonica/pull/18
[#19]: https://github.com/aoirint/harmonica/pull/19
[#20]: https://github.com/aoirint/harmonica/pull/20
[#21]: https://github.com/aoirint/harmonica/pull/21
[#22]: https://github.com/aoirint/harmonica/pull/22
[#23]: https://github.com/aoirint/harmonica/pull/23
[#24]: https://github.com/aoirint/harmonica/pull/24
[#25]: https://github.com/aoirint/harmonica/pull/25
[#26]: https://github.com/aoirint/harmonica/pull/26
[#27]: https://github.com/aoirint/harmonica/pull/27
[#28]: https://github.com/aoirint/harmonica/pull/28
[#29]: https://github.com/aoirint/harmonica/pull/29
[#31]: https://github.com/aoirint/harmonica/pull/31
[#32]: https://github.com/aoirint/harmonica/pull/32
[#33]: https://github.com/aoirint/harmonica/pull/33
[#34]: https://github.com/aoirint/harmonica/pull/34
[#35]: https://github.com/aoirint/harmonica/pull/35
[#37]: https://github.com/aoirint/harmonica/pull/37
[#38]: https://github.com/aoirint/harmonica/pull/38
[#39]: https://github.com/aoirint/harmonica/pull/39
[#40]: https://github.com/aoirint/harmonica/pull/40
[#41]: https://github.com/aoirint/harmonica/pull/41
[#42]: https://github.com/aoirint/harmonica/pull/42
[#43]: https://github.com/aoirint/harmonica/pull/43
[#44]: https://github.com/aoirint/harmonica/pull/44
[#45]: https://github.com/aoirint/harmonica/pull/45
[#46]: https://github.com/aoirint/harmonica/pull/46
[#47]: https://github.com/aoirint/harmonica/pull/47
[#51]: https://github.com/aoirint/harmonica/pull/51
[#55]: https://github.com/aoirint/harmonica/pull/55
[#56]: https://github.com/aoirint/harmonica/pull/56
[#57]: https://github.com/aoirint/harmonica/pull/57
[#58]: https://github.com/aoirint/harmonica/pull/58
[#59]: https://github.com/aoirint/harmonica/pull/59
[#60]: https://github.com/aoirint/harmonica/pull/60
[#64]: https://github.com/aoirint/harmonica/pull/64
[#65]: https://github.com/aoirint/harmonica/pull/65
[#66]: https://github.com/aoirint/harmonica/pull/66
[#67]: https://github.com/aoirint/harmonica/pull/67
[#68]: https://github.com/aoirint/harmonica/pull/68
[#69]: https://github.com/aoirint/harmonica/pull/69
[#70]: https://github.com/aoirint/harmonica/pull/70
