import { Loader } from './components/Loader'
import { Panel } from './components/Panel'
import { Scene } from './components/Scene'

export function App() {
  return (
    <div className="cfg">
      <div className="cfg-stage">
        <Scene />
        <Loader />
      </div>
      <Panel />
    </div>
  )
}
