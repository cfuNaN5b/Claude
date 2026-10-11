import { useState } from 'react'
import { addToCart } from '../cart'
import { data, formatMoney, variantFor } from '../data'
import { shareUrl, useConfig } from '../store'
import type { Part } from '../types'

function Price({ part, color }: { part: Part; color: string }) {
  const v = variantFor(part, color)
  if (!v) return null
  return <span className="cfg-price">{v.available ? formatMoney(v.price) : data.strings.soldOut}</span>
}

export function Panel() {
  const config = useConfig()
  const { strings } = data
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const parts: Part[] = [
    ...data.stands.filter(s => s.id === config.stand),
    ...data.accessories.filter(a => config.accessories.includes(a.id)),
  ]
  const variants = parts.map(p => variantFor(p, config.color))
  const buyable = variants.length > 0 && variants.every(v => v?.available)
  const total = variants.reduce((sum, v) => sum + (v?.price ?? 0), 0)

  async function onAdd() {
    setBusy(true)
    setError(null)
    try {
      await addToCart(variants.map(v => v!.id))
    } catch (e) {
      setError((e as Error).message)
      setBusy(false)
    }
  }

  async function onShare() {
    await navigator.clipboard.writeText(shareUrl(config))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <aside className="cfg-panel">
      <h1 className="cfg-heading">{strings.heading}</h1>

      <fieldset className="cfg-group">
        <legend>{strings.stands}</legend>
        {data.stands.map(s => (
          <label key={s.id} className="cfg-option">
            <input type="radio" name="stand" checked={config.stand === s.id} onChange={() => config.setStand(s.id)} />
            <span>{s.label}</span>
            <Price part={s} color={config.color} />
          </label>
        ))}
      </fieldset>

      <fieldset className="cfg-group">
        <legend>
          {strings.color}: <strong>{config.color}</strong>
        </legend>
        <div className="cfg-swatches">
          {data.colors.map(c => (
            <button
              key={c.name}
              type="button"
              className="cfg-swatch"
              style={{ background: c.swatch }}
              aria-label={c.name}
              aria-pressed={config.color === c.name}
              onClick={() => config.setColor(c.name)}
            />
          ))}
        </div>
      </fieldset>

      {data.accessories.length > 0 && (
        <fieldset className="cfg-group">
          <legend>{strings.accessories}</legend>
          {data.accessories.map(a => (
            <label key={a.id} className="cfg-option">
              <input
                type="checkbox"
                checked={config.accessories.includes(a.id)}
                onChange={() => config.toggleAccessory(a.id)}
              />
              <span>{a.label}</span>
              <Price part={a} color={config.color} />
            </label>
          ))}
        </fieldset>
      )}

      <div className="cfg-footer">
        <div className="cfg-total">
          <span>{strings.total}</span>
          <strong>{formatMoney(total)}</strong>
        </div>
        <button type="button" className="cfg-button" disabled={!buyable || busy} onClick={onAdd}>
          {buyable ? strings.addToCart : strings.soldOut}
        </button>
        <button type="button" className="cfg-link" onClick={onShare}>
          {copied ? strings.copied : strings.share}
        </button>
        {error && <p className="cfg-error">{error}</p>}
      </div>
    </aside>
  )
}
