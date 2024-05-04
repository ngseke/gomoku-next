import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faBeer, faFlask } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { type ComponentProps } from 'react'

function LinkWithIcon ({ icon, children, ...restProps }: ComponentProps<typeof Link> & {
  icon?: IconProp
}) {
  return (
    <Link className="text-nowrap hover:underline" {...restProps}>
      {icon &&
        <FontAwesomeIcon className="mr-1.5" icon={icon} />}
      {children}
    </Link>
  )
}

export function Footer () {
  return (
    <footer className="bg-neutral-100 py-4 text-xs font-medium text-neutral-600 dark:bg-neutral-900 dark:text-neutral-400">
      <div className="container flex max-w-[1000px] flex-wrap gap-5 px-4">
        <LinkWithIcon href="/playground" icon={faFlask}>
          Component Playground
        </LinkWithIcon>
        <LinkWithIcon
          href="https://github.com/ngseke/gomoku-next"
          icon={faGithub}
          target="_blank"
        >
          GitHub
        </LinkWithIcon>
        <div className="flex-1" />

        <Link
          className="duration-300 hover:text-[#facc15] hover:drop-shadow-[0_0_.2rem_#facc15]"
          href="https://ngseke.me"
          target="_blank"
        >
          <FontAwesomeIcon className="mr-1.5" icon={faBeer} />
        </Link>
      </div>
    </footer>
  )
}
