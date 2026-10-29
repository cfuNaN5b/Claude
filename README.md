# JALG Shopify theme

All code for the JALG store (Motion 10.4.0 by Archetype Themes, with JALG changes) lives in this repository.

| Folder | What it is |
|---|---|
| `assets/`, `blocks/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, `templates/` | The theme itself, exactly the folders Shopify uses. |
| `custom-liquid/` | Code to paste into **Custom Liquid** blocks in the theme editor. Not uploaded with the theme. |

Starting point: the export of **jalg-tv-stands-09-10-2026** from 29 Oct 2026, plus the changes below that were not in that export yet.

## Not yet uploaded to Shopify (as of 29 Oct 2026)

- `sections/slideshow.liquid`: bottom text spacing depends on the slide navigation.
- `snippets/product-template.liquid`: GSC badge only on products tagged `show-badge`; Frequently bought together sits after the trust line.
- `sections/jalg-feature-list.liquid` and `assets/jalg-icon-*.svg`: the product page feature list.
- `assets/wheel-icon.png`, `assets/wheel-icon.svg`.

## One-time setup (about 15 minutes)

1. Install **Node.js** (LTS version) from https://nodejs.org.
2. Install **Shopify CLI** in Terminal:

   ```bash
   npm install -g @shopify/cli@latest
   ```

3. Download this repository to your computer (GitHub Desktop, or `git clone`), and open Terminal in that folder.
4. Log in to the store once. The first theme command opens the browser to log in:

   ```bash
   shopify theme list --store jalg-me.myshopify.com
   ```

   If the store address is different, use the `.myshopify.com` address shown in Shopify admin → Settings → Domains.

## Everyday workflow

Preview changes privately (live reload, nothing goes live; opens at http://127.0.0.1:9292):

```bash
shopify theme dev --store jalg-me.myshopify.com
```

Check for errors:

```bash
shopify theme check
```

Get the latest editor changes from Shopify before uploading (theme editor settings and JSON templates change in Shopify, not here):

```bash
shopify theme pull --theme "jalg-tv-stands-09-10-2026" --only "templates/*.json" --only "sections/*.json" --only "config/settings_data.json"
```

Upload to a new **unpublished** theme for review:

```bash
shopify theme push --unpublished
```

Upload changed code files to an existing unpublished theme, without touching editor settings:

```bash
shopify theme push --theme <theme-id> --nodelete --ignore "config/settings_data.json" --ignore "templates/*.json" --ignore "sections/*.json"
```

Publish when you are happy (or use Shopify admin → Online Store → Themes → Publish):

```bash
shopify theme publish --theme <theme-id>
```

`shopify theme list` shows each theme's ID.

## Working with Claude Code

Claude Code edits the files here, runs the commands above and uploads to an **unpublished** theme. You review the preview and publish. Claude Code never publishes or uploads to the live theme. The rules it follows are in `CLAUDE.md`.

- **Claude Code on your computer** (desktop app or `claude` in Terminal): uses your Shopify CLI login, so it can run `theme dev`, `theme check` and `theme push`.
- **Claude Code on the web**: works on GitHub only. To let it upload too, create a password in Shopify's **Theme Access** app and add it to the Claude Code environment as the secret `SHOPIFY_CLI_THEME_TOKEN`, with `SHOPIFY_FLAG_STORE=jalg-me.myshopify.com`.

## Optional: Shopify's GitHub connection

Shopify admin → Online Store → Themes → Add theme → Connect from GitHub links a branch of this repository to a theme. Commits then show up in that theme automatically, and theme editor changes are committed back to the branch. Connect it to an **unpublished** theme first.
