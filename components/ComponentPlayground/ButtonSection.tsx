'use client'
import { Button } from '../Button'
import { faGear, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Headline } from './Headline'

export function ButtonSection () {
  return (<>
    <Headline>Button / Icon Button</Headline>
    <div className="flex flex-wrap gap-2">
      <Button>Exit Room</Button>
      <Button>min-w</Button>
      <Button icon={<FontAwesomeIcon icon={faGear} />} />
      <Button icon={<FontAwesomeIcon icon={faGoogle} />}>
        Google
      </Button>
      <Button disabled icon={<FontAwesomeIcon icon={faRightFromBracket} />} />
      <Button disabled icon={<FontAwesomeIcon icon={faUser} />}>
        Sign in as Guest
      </Button>
      <Button loading icon={<FontAwesomeIcon icon={faUser} />}>
        Loading
      </Button>
      <Button loading icon={<FontAwesomeIcon icon={faUser} />} />
      <Button icon={<FontAwesomeIcon icon={faGoogle} />} variant="subtle">
        subtle
      </Button>

      <Button block>Block</Button>
    </div>
  </>)
}
