'use client'

import { useSignInWithGoogleAuth } from '@/hooks/useSignInWithGoogleAuth'
import { useSignOut } from '@/hooks/useSignOut'
import { UserPill } from './UserPill'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from './Button'
import { useSignInAnonymously } from '@/hooks/useSignInAnonymously '
import { useAuthStore } from '@/hooks/useAuthStore'

function Divider () {
  return <hr className="h-6 border-l border-neutral-200" />
}

export function SignInPanel () {
  const { signIn } = useSignInWithGoogleAuth()

  const { signInAnonymously, isSigningInAnonymously } = useSignInAnonymously()

  const { player, isInitializingPlayer } = useAuthStore()

  const { signOut } = useSignOut()

  const shouldDisableButton = isSigningInAnonymously

  return (
    <div className="flex flex-wrap items-center gap-2">
      {player ?? isInitializingPlayer
        ? <>
          <UserPill emoji={player?.emoji} loading={isInitializingPlayer} name={player?.name} />

          <Button
            key="setting"
            icon={<FontAwesomeIcon icon={faGear} />}
          />

          <UserPill color="black" emoji={player?.emoji} image={player?.avatar} loading={isInitializingPlayer} name={player?.name} />
          <UserPill color="white" emoji={player?.emoji} image={player?.avatar} loading={isInitializingPlayer} name={player?.name} />

          {/* <UserPill />
          <UserPill loading />
          <UserPill loading={isInitializingUser} name={player?.name} />
          <UserPill loading={isInitializingUser} name={player?.name?.repeat(5)} /> */}

          <Divider />

          <Button
            key="signOut"
            icon={<FontAwesomeIcon icon={faRightFromBracket} />}
            onClick={signOut}
          />
        </>
        : <>
          <span className="font-medium text-neutral-600">
            Sign in with
          </span>

          <Button
            disabled={shouldDisableButton}
            icon={<FontAwesomeIcon icon={faGoogle} />}
            onClick={signIn}
          >
            Google
          </Button>

          <Divider />

          <Button
            disabled={shouldDisableButton}
            icon={<FontAwesomeIcon icon={faUser} />}
            onClick={signInAnonymously}
          >
            Sign in as Guest
          </Button>
        </>}
    </div>
  )
}
