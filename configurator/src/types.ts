// Shape of the JSON that sections/configurator.liquid renders into
// <script type="application/json" id="configurator-data">.

export interface Variant {
  id: number
  title: string
  /** In the customer's presentment currency, in minor units (cents). */
  price: number
  available: boolean
  options: string[]
}

export interface Product {
  handle: string
  title: string
  /** Option names, e.g. ["Color"]. */
  options: string[]
  variants: Variant[]
}

export interface Part {
  id: string
  label: string
  /** GLB URL, or null to draw a placeholder shape. */
  model: string | null
  /** Null while the block has no product picked; the part shows but can't be bought. */
  product: Product | null
}

export interface Stand extends Part {
  /** Placeholder column height in cm. */
  height: number
}

export interface Accessory extends Part {
  /** Placeholder shape. */
  kind: 'shelf' | 'wheels'
}

export interface Color {
  /** Must match the variant option value, e.g. "Oat". */
  name: string
  swatch: string
}

export interface ConfiguratorData {
  locale: string
  currency: string
  /** Variant option that carries the colour, e.g. "Color". */
  colorOption: string
  /** Material name in the GLBs that takes the selected colour. */
  tintMaterial: string
  cartUrl: string
  cartAddUrl: string
  strings: {
    heading: string
    stands: string
    color: string
    accessories: string
    total: string
    addToCart: string
    soldOut: string
    share: string
    copied: string
  }
  colors: Color[]
  stands: Stand[]
  accessories: Accessory[]
}
