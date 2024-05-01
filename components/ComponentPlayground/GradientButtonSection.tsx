import { NewRoomButton } from '../GradientButton/NewRoomButton'
import { JoinRoomButton } from '../GradientButton/JoinRoomButton'
import { ProfileButton } from '../GradientButton/ProfileButton'
import { Headline } from './Headline'

export function GradientButtonSection () {
  return (<>
    <Headline>Gradient Button</Headline>
    <div className="grid gap-4 sm:grid-cols-3">
      <NewRoomButton />
      <JoinRoomButton />
      <ProfileButton />
    </div>
  </>)
}
