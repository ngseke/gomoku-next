import { LogoIcon } from '../LogoIcon'
import { LogoText } from '../LogoText'
import { Headline } from './Headline'

export function LogoSection () {
  return (<>
    <Headline>Logo Text</Headline>
    <LogoText />
    <LogoText className="text-3xl" />
    <LogoText className="text-2xl" />

    <Headline>Logo Icon</Headline>
    <LogoIcon />
    <LogoIcon className="size-12" />
  </>)
}
