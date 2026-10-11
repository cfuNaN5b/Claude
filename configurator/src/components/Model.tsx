import { useGLTF } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import { Mesh, MeshStandardMaterial } from 'three'
import { data } from '../data'

/**
 * A GLB part. Meshes whose material is named `data.tintMaterial` take the
 * selected colour; the rest of the model keeps its own materials.
 * Export every part in the same coordinate space as the stand, so they line up.
 */
export function Model({ url, color }: { url: string; color: string }) {
  // useGLTF caches by URL and decodes Draco with drei's default decoder (from Google's CDN).
  const { scene } = useGLTF(url)

  // Clone so the cached scene can be reused, and give the clone its own
  // tint materials so recolouring one part doesn't recolour another.
  const { root, tinted } = useMemo(() => {
    const root = scene.clone(true)
    const tinted: MeshStandardMaterial[] = []
    root.traverse(o => {
      if (!(o instanceof Mesh)) return
      o.castShadow = true
      o.receiveShadow = true
      if (o.material instanceof MeshStandardMaterial && o.material.name === data.tintMaterial) {
        o.material = o.material.clone()
        tinted.push(o.material)
      }
    })
    return { root, tinted }
  }, [scene])

  useEffect(() => {
    tinted.forEach(m => m.color.set(color))
  }, [tinted, color])

  return <primitive object={root} />
}
