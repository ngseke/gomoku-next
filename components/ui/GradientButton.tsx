import { type CSSProperties, type ComponentProps } from 'react'
import { BaseGradientButton } from './BaseGradientButton'

export function GradientButton (
  { text, textColor, ...restProps }: ComponentProps<typeof BaseGradientButton> & {
    text: string
    textColor?: string
  }
) {
  return (
    <BaseGradientButton {...restProps}>
      <span
        className="relative z-10 text-2xl font-bold italic tracking-wide text-white"
        style={{ color: textColor }}
      >
        {text}
      </span>

      <span
        className="absolute -left-8 -top-4 text-9xl font-bold italic tracking-tighter text-transparent opacity-30 after:content-[var(--text)]"
        style={{
          '-webkit-text-stroke': '1px white',
          '--text': `'${text}'`,
        } as CSSProperties}
      />
    </BaseGradientButton>
  )
}
