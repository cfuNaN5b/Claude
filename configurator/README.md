# 3D configurator

A React Three Fiber app that lets customers build a stand (stand, colour,
accessories) in 3D and add the whole setup to the cart in one go. It is built
with Vite straight into the theme's `assets/` folder.

## Files

| Path | What it is |
|---|---|
| `configurator/` | The app's source (this folder) |
| `assets/configurator.js`, `assets/configurator.css` | Build output; commit it after `npm run build` so the theme has it |
| `layout/configurator.liquid` | Full-screen layout without the theme's header, footer or CSS |
| `templates/page.configurator.json` | Page template that uses the layout and the section |
| `sections/configurator.liquid` | Mount point, the JSON data the app reads, and the editor settings |
| `snippets/configurator-part.liquid` | JSON for one stand or accessory block |

## Develop

```bash
cd configurator
npm install
npm run dev        # http://localhost:5173 with sample data from index.html
```

`index.html` is only used in development. It holds the same JSON the section
renders on the store, so edit it to try other products. GLB files you put in
`public/` can be referenced as `"/file.glb"`.

Parts without a model are drawn as placeholder shapes, so everything works
before the real models exist.

## Build for the theme

```bash
npm run build      # typecheck, then write ../assets/configurator.{js,css}
npm run watch      # rebuild on save; pair with `shopify theme dev` in the theme root
```

File names are fixed (no hashes) so the layout can use `asset_url`. Shopify's
`?v=` query string handles cache busting.

## Set it up in the store

1. Upload the theme (or push it with `shopify theme push`).
2. Create a page and pick the **page.configurator** template.
3. In the theme editor, open the **3D configurator** section and fill in the
   blocks:
   - **Stand**: a product, an optional label and a 3D model.
   - **Accessory**: same, plus a placeholder shape.
   - **Colour**: the name must match the products' colour option value
     exactly (e.g. `Oat`), and the swatch is what the model is painted with.

When a customer picks a colour, every part uses its variant in that colour.
Products without a colour option (for example wheels) use their first variant.
The add-to-cart button turns into "Sold out" when any chosen variant is
unavailable or a block has no product yet.

## 3D models

Each part's model comes from, in order:

1. the block's **3D model asset**: a GLB uploaded to the theme's `assets/`,
   e.g. `moon-regular.glb` (theme assets are limited to 20 MB each);
2. the product's first **3D model media** (the GLB Shopify generates);
3. a placeholder shape.

When you export models:

- Export every part in the **same coordinate space** as the stand, in metres
  with the floor at y = 0. An accessory then sits in the right place without
  any offsets.
- Name the material that should take the selected colour `Body` (this is the
  section's **Tinted material name** setting). Other materials keep their own
  look.
- Compress the files before uploading:
  `npx gltfjsx model.glb --transform` applies Draco compression and resizes
  textures. Draco is decoded with drei's default decoder from Google's CDN.

## How it works

- `src/data.ts` reads `<script id="configurator-data">`, picks the variant for
  each colour, and formats prices in the customer's currency (Liquid renders
  prices for the customer's market).
- `src/store.ts` keeps the selection in a Zustand store and mirrors it into
  `?configuration=…`, so reloading or sharing the link restores it.
- `src/components/Scene.tsx` renders the scene with studio lighting built from
  light panels (no HDR download), contact shadows and orbit controls.
- `src/cart.ts` posts every variant to `/cart/add.js` in one request, then
  goes to the cart.
