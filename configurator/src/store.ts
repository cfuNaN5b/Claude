import { create } from 'zustand'
import { data } from './data'

export interface Configuration {
  stand: string
  color: string
  accessories: string[]
}

const PARAM = 'configuration'

const defaults: Configuration = {
  stand: data.stands[0]?.id ?? '',
  color: data.colors[0]?.name ?? '',
  accessories: [],
}

// The configuration lives in ?configuration=<base64url JSON>, so a copied
// link (or a reload) restores the same build.
function encode(c: Configuration) {
  const bytes = new TextEncoder().encode(JSON.stringify(c))
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function decode(s: string): Partial<Configuration> {
  try {
    const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, ch => ch.charCodeAt(0))))
  } catch {
    return {}
  }
}

/** Drops ids that no longer exist, e.g. from a link shared before a block was removed. */
function sanitize(c: Partial<Configuration>): Configuration {
  return {
    stand: data.stands.some(s => s.id === c.stand) ? c.stand! : defaults.stand,
    color: data.colors.some(col => col.name === c.color) ? c.color! : defaults.color,
    accessories: Array.isArray(c.accessories)
      ? c.accessories.filter(id => data.accessories.some(a => a.id === id))
      : defaults.accessories,
  }
}

const initial = sanitize(decode(new URLSearchParams(location.search).get(PARAM) ?? ''))

interface State extends Configuration {
  setStand: (id: string) => void
  setColor: (name: string) => void
  toggleAccessory: (id: string) => void
}

export const useConfig = create<State>(set => ({
  ...initial,
  setStand: stand => set({ stand }),
  setColor: color => set({ color }),
  toggleAccessory: id =>
    set(s => ({
      accessories: s.accessories.includes(id) ? s.accessories.filter(a => a !== id) : [...s.accessories, id],
    })),
}))

export function shareUrl({ stand, color, accessories }: Configuration) {
  const url = new URL(location.href)
  url.searchParams.set(PARAM, encode({ stand, color, accessories }))
  return url.toString()
}

useConfig.subscribe(state => history.replaceState(history.state, '', shareUrl(state)))
