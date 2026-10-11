import type { ConfiguratorData, Part, Variant } from './types'

function read(): ConfiguratorData {
  const el = document.getElementById('configurator-data')
  if (!el?.textContent) throw new Error('Configurator: #configurator-data is missing')
  return JSON.parse(el.textContent)
}

export const data = read()

const colorIndex = (part: Part) => part.product?.options.indexOf(data.colorOption) ?? -1

/** The part's variant in the chosen colour; the first variant if it has no colour option. */
export function variantFor(part: Part, color: string): Variant | null {
  const variants = part.product?.variants
  if (!variants?.length) return null
  const i = colorIndex(part)
  if (i < 0) return variants[0]
  return variants.find(v => v.options[i] === color) ?? null
}

const money = new Intl.NumberFormat(data.locale, { style: 'currency', currency: data.currency })
export const formatMoney = (cents: number) => money.format(cents / 100)
