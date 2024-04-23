import { ComponentPlayground } from '@/components/ComponentPlayground/ComponentPlayground'
import { Playground } from '@/components/Playground'

export default async function Home () {
  return (<>
    <ComponentPlayground />
    <hr />
    <Playground />
  </>)
}
