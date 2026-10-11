import { data } from './data'

/** Adds every variant in one request, then goes to the cart page. */
export async function addToCart(variantIds: number[]) {
  const res = await fetch(data.cartAddUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ items: variantIds.map(id => ({ id, quantity: 1 })) }),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new Error(body?.description ?? `Could not add to cart (${res.status})`)
  }
  location.href = data.cartUrl
}
