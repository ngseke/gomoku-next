import { cn } from '@/modules/cn'
import { useTranslations } from 'next-intl'

export function ResultSign ({ type }: {
  type: 'win' | 'lose' | 'draw'
}) {
  const t = useTranslations()

  const text = ({
    win: t('result.win'),
    lose: t('result.lose'),
    draw: t('result.draw'),
  })[type]

  const displayedText = text.length === 2
    ? <>
      {text[0]}
      <span className='after:content-["_"]' />
      {text[1]}
    </>
    : text

  return (
    <div
      className={cn('-skew-x-12 select-none rounded-xl bg-neutral-200/50 bg-gradient-to-tr px-4 py-2 text-4xl font-black tracking-tight text-neutral-100', {
        'from-[#4facfe] to-[#00f2fe]/50 shadow-[0_0_2rem_#00f2fe]': type === 'win',
        'from-[#c471f5] to-[#fa71cd]/50 shadow-[0_0_2rem_#fa71cd]': type === 'lose',
        'from-[#84fab0] to-[#8fd3f4]/50 shadow-[0_0_2rem_#84fab0]': type === 'draw',
      })}
    >
      {displayedText}
    </div>
  )
}
