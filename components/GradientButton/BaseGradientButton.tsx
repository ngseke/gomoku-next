import { type ComponentProps, type MouseEvent, useState, type CSSProperties, useRef } from 'react'

type BaseGradientButtonProps = ComponentProps<'button'> & {
  colors?: string[]
}

const initialPercent = [100, 0]

export function BaseGradientButton ({
  children,
  colors = ['#fff', '#e9ecef'],
  onClick,
  ...restProps
}: BaseGradientButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null)

  const [[xPercent, yPercent], setPercent] = useState(initialPercent)

  const style = {
    '--bg': `
      radial-gradient(
        circle 600px at ${xPercent}% ${yPercent}%,
        ${colors.join(',')}
      )
    `,
  } as CSSProperties

  function handleMouseMove (event: MouseEvent<HTMLButtonElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return

    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    setPercent([
      (x / rect.width) * 100,
      (y / rect.height) * 100,
    ])
  }

  return (
    <div className="group relative h-32 w-full transition active:scale-[98%]">
      <button
        ref={ref}
        className="peer relative block size-full overflow-hidden rounded-2xl bg-[image:var(--bg)] transition duration-500"
        style={style}
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        {...restProps}
      >
        {children}
      </button>
      <span
        className="absolute inset-0 -z-10 rounded-2xl bg-[image:var(--bg)] opacity-30 blur-xl transition-opacity duration-500 peer-hover:opacity-80"
        style={style}
      />
    </div>
  )
}