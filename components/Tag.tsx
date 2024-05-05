import { cn } from '@/modules/cn'
import { type Nullish } from '@/types/Nullish'
import { type IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type ReactNode, type ComponentProps } from 'react'

function Skeleton () {
  return (
    <span className="my-0.5 h-3 w-10 rounded-md bg-neutral-200 transition-colors duration-300 dark:bg-neutral-800" />
  )
}

type TagProps = ComponentProps<'span'> & {
  icon?: IconProp
  text?: Nullish<string>
  active?: boolean
  rightSection?: ReactNode
}

export function Tag ({ icon, text, active, rightSection, className, ...restProps }: TagProps) {
  return (
    <span
      className={cn(
        'relative inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-1.5 py-0.5 font-mono text-xs transition-colors duration-300 dark:border-neutral-800',
        active
          ? "border-[#fcb69f] font-bold text-[#fcb69f] shadow-[0_0_.5rem_#fcb69f] after:pointer-events-none after:absolute after:inset-[-1px] after:animate-[tag-ping_5s_infinite] after:rounded-lg after:border after:border-[#fcb69f] after:content-[''] dark:border-[#fcb69f]"
          : 'text-neutral-200 dark:text-neutral-800',
        className
      )}
      {...restProps}
    >
      {icon && <FontAwesomeIcon icon={icon} />}

      {text
        ? <span className="text-neutral-600 dark:text-neutral-400">
          {text}
          {rightSection}
        </span>
        : <Skeleton />}
    </span>
  )
}
