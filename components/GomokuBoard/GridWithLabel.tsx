import { cn } from '@/modules/cn'
import { type PropsWithChildren } from 'react'

const size = 15

function Label (props: PropsWithChildren) {
  return (
    <div
      className="flex flex-1 select-none items-center justify-center truncate"
      {...props}
    />
  )
}

function Track ({
  type,
  show,
  children,
}: PropsWithChildren<{ type: 'files' | 'ranks', show?: boolean }>) {
  return (
    <div className="relative" style={{ gridArea: type }}>
      <div
        className={cn('absolute left-0 top-0 flex size-full overflow-hidden text-xs font-bold text-neutral-300 opacity-0 duration-300 dark:text-neutral-700', {
          'flex-col': type === 'files',
          'opacity-100': show,
        })}
      >
        {children}
      </div>
    </div>
  )
}

const rankLabels = Array.from({ length: size })
  .map((_, index) => String.fromCharCode(65 + index))

const fileLabels = Array.from({ length: size })
  .map((_, index) => String(size - index))

export function GridWithLabel ({
  showLabels, children,
}: PropsWithChildren<{ showLabels?: boolean }>) {
  const trackWidth = showLabels ? '1.5rem' : 0

  return (
    <div
      className="grid duration-300"
      style={{
        gridTemplate: `
          "files board" 1fr
          "a ranks" ${trackWidth} / ${trackWidth} 1fr
        `,
      }}
    >
      <Track show={showLabels} type="ranks">
        {rankLabels.map(text => (<Label key={text}>{text}</Label>))}
      </Track>

      <Track show={showLabels} type="files">
        {fileLabels.map(text => (<Label key={text}>{text}</Label>))}
      </Track>

      <div style={{ gridArea: 'board' }}>{children}</div>
    </div>
  )
}
