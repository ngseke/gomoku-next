'use client'

import { useInitializeUser } from '@/hooks/initialize/useInitializeUser'
import { BackIconButton } from './BackIconButton'
import { LanguageButtonWithMenu } from './LanguageButtonWithMenu'
import { LogoText } from './LogoText'
import { Navbar } from './Navbar'
import { ThemeButton } from './ThemeButton'
import { cn } from '@/modules/cn'
import { useAxios } from '@/hooks/useAxios'
import { faBook, faDatabase, faRightFromBracket, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { AxiosError } from 'axios'
import { useAuthStore } from '@/hooks/useAuthStore'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { Button } from './Button'
import { PlayerPillButton } from './PlayerPillButton'
import { useSignInWithGoogleAuth } from '@/hooks/useSignInWithGoogleAuth'
import { useSignOut } from '@/hooks/useSignOut'
import { useTranslations } from 'next-intl'

export function Admin () {
  useInitializeUser()

  const t = useTranslations()
  const axios = useAxios()
  const [logs, setLogs] = useState<any[]>([])

  async function handleRequest (fn: () => Promise<unknown>) {
    try {
      await fn()
      setLogs((prev) => [...prev, 'Success!'])
    } catch (err) {
      let message: string
      if (err instanceof AxiosError) {
        message = (err as AxiosError).response?.data as string
      } else if (err instanceof Error) {
        message = err.message
      }

      setLogs((prev) => [...prev, message])
    }
  }

  const actions = [
    {
      name: 'Reset Rules',
      icon: faBook,
      async handler () {
        await handleRequest(
          async () => await axios.post('/api/admin/resetRules')
        )
      },
    },
    {
      name: 'Clear Anonymous Users',
      icon: faUsers,
      async handler () {
        await handleRequest(
          async () => await axios.post('/api/admin/clearAnonymousUsers')
        )
      },
    },
    {
      name: 'Clear Database',
      icon: faDatabase,
      isDangerous: true,
      async handler () {
        await handleRequest(
          async () => await axios.post('/api/admin/clearDatabase')
        )
      },
    },
  ]

  const { player, isInitializingPlayer } = useAuthStore()
  const { signOut } = useSignOut()
  const { signIn } = useSignInWithGoogleAuth()

  return (<>
    <Navbar>
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-4">
          <BackIconButton href="/" />
          <LogoText className="text-nowrap text-2xl sm:text-3xl" />
        </div>

        <div className="flex gap-2">
          <ThemeButton />
          <LanguageButtonWithMenu placement="bottom-end" />
        </div>
      </div>
    </Navbar>

    <div className="container flex max-w-[1000px] flex-col gap-6 px-4 pb-8 pt-24">
      <div className="flex flex-wrap items-center gap-2">
        {player ?? isInitializingPlayer
          ? <>
            <PlayerPillButton
              disabled={isInitializingPlayer}
              emoji={player?.emoji}
              loading={isInitializingPlayer}
              name={player?.name}
            />

            <Button
              key="signOut"
              icon={<FontAwesomeIcon icon={faRightFromBracket} />}
              onClick={signOut}
            />
          </>
          : <>
            <span className="font-medium opacity-60">
              {t('action.signIn')}
            </span>
            <Button
              icon={<FontAwesomeIcon icon={faGoogle} />}
              onClick={signIn}
            >
              Google
            </Button>
          </>}
      </div>
      <h2 className="text-3xl font-bold">
        Admin Actions
      </h2>

      <ul className="flex flex-col gap-2 font-mono">
        {actions.map((action, index) => (
          <li key={index} className="">
            <button
              className={cn('inline-flex items-center gap-2 font-bold hover:underline', {
                'text-red-500': action.isDangerous,
              })}
              onClick={action.handler}
            >
              <FontAwesomeIcon className="min-w-5" icon={action.icon} />
              {action.name}
            </button>
          </li>
        ))}
      </ul>

      <hr className="opacity-50" />
      <ol className="list-inside list-decimal font-mono">
        {logs.map((log, index) => (<li key={index}>{log}</li>))}
      </ol>
    </div>
  </>)
}
