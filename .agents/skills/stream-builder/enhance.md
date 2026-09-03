# Enhance an existing app (Track E)

For adding Stream products to an **existing Next.js project**. Reuses the references files and SDK patterns from the scaffold flow but skips the scaffold entirely.

> **Reviewing, not adding?** If the user wants to **audit/check an existing Stream Video integration against best practices** ("is my video app production-ready?", "what am I missing?") rather than add a feature, run the **Integration best-practices audit** section in [`references/VIDEO.md`](references/VIDEO.md). It is a read-only review with a fixed checklist + output contract - produce findings first, fix only if asked.

**Rules:** the `stream` skill's [`RULES.md`](../stream/RULES.md) (secrets, no auto-seeding, login screen first, package manager).
**Onboard first:** run `getstream init` to authenticate and select or create the org + app before any npm installs, `getstream env`, or token routes. See [`../stream/SKILL.md`](../stream/SKILL.md) > Stream CLI for usage.
**SDK wiring (shared with the scaffold flow):** [`sdk.md`](sdk.md) and the relevant [`references/<Product>.md`](references/) - enhance uses the same wiring patterns as scaffold; only the surrounding setup differs.

---

## E1: Audit the existing project

Before writing any code, understand what's already in place:

1. **Packages:** check `package.json` for `stream-chat`, `stream-chat-react`, `@stream-io/video-react-sdk`, `@stream-io/node-sdk`.
2. **Auth:** does the app already have a `/api/token` route? If so, **extend** it with the new product's token - don't create a second token route.
3. **Credentials:** check whether `.env.local` or a legacy `.env` exists, and if so, whether it already declares the required Stream credential variables for this project with a non-empty, usable value (e.g. `grep -qE '^<REQUIRED_VAR_NAME>=.+' .env.local .env 2>/dev/null` - the `.+` requires at least one character after `=`, so a declared-but-empty `<REQUIRED_VAR_NAME>=` line does not count as present) - check presence and non-emptiness only, never read or print the values themselves, and don't otherwise inspect unrelated contents of the file. If no env file exists, or a required variable is missing or empty or the file is otherwise stale, run `getstream init` (if the dir isn't a Stream project yet) then `getstream env` to write them. If every required variable is already present with a non-empty value, skip `getstream init`/`getstream env` for this step.
4. **UI framework:** confirm Tailwind, Shadcn, or whatever the project uses. Do **not** install Shadcn or change the styling setup unless the user asks.
5. **Directory structure:** note whether the project uses `app/` or `src/app/` - match the existing convention.
6. **Package manager:** detect from the lockfile (`package-lock.json` -> npm, `yarn.lock` -> yarn, `pnpm-lock.yaml` -> pnpm) and use it for every install below.

## E2: Install + configure

1. **Install** only the new SDKs, using the package manager detected in E1 (npm, yarn, or pnpm from the project's lockfile) - `npm install <new-packages> --legacy-peer-deps` only for npm projects; translate the flags/command for yarn/pnpm without adding a second lockfile.
2. **Configure via CLI:** run setup commands from the relevant `references/<Product>.md` (App Integration -> Setup). Feeds needs feed groups created; Moderation needs blocklist + config.
3. **Import CSS** if the product needs it (Chat: `stream-chat-react/css/index.css` (v14+ preferred alias; v13 used `dist/css/v2/index.css`), Video: `@stream-io/video-react-sdk/dist/css/styles.css`).

## E3: Integrate

1. **Token route:** extend the existing `/api/token` to return the new product's token alongside existing ones. Follow [`sdk.md`](sdk.md) for server-side instantiation patterns.
2. **API routes:** add product-specific routes from `references/<Product>.md` (App Integration -> API Routes). Feeds needs several (`/api/feed/get`, `/api/feed/post`, etc.); Chat and Video typically only need the token route.
3. **Components:** load the relevant `references/<Product>-blueprints.md` sections and build components using the existing project's patterns and styling conventions - not the [`builder-ui.md`](builder-ui.md) defaults.
4. **State:** if the app already manages user state (auth context, session), wire Stream tokens into that - don't add a separate Login Screen unless the app has no auth.

## E4: Verify

```bash
npx tsc --noEmit
npx next build
```

Fix any errors.

---

## Key constraints

- Do **not** re-scaffold, re-initialize Shadcn, install frontend skills, or modify `globals.css` / `layout.tsx`.
- Do **not** overwrite or restructure existing files - add new files alongside them.
- Do **not** change the existing auth flow. Adapt Stream's token generation to fit the app's existing auth, not the other way around.
- If the project uses a different package manager (yarn, pnpm), match what it already uses - the npm-only rule applies to new scaffolds, not existing projects.
