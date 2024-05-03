'use client'

import { cn } from '@/modules/cn'
import { type Nullish } from '@/types/Nullish'
import dataByGroup from 'unicode-emoji-json/data-by-group.json'

export function EmojiPicker ({ value, onChange }: {
  value?: Nullish<string>
  onChange?: (value: string) => void
}) {
  return (
    <div className="max-h-44 overflow-auto">
      {dataByGroup.map((group) => (
        <section key={group.name} className="mb-4">
          <h2 className="mb-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">{group.name}</h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(2rem,1fr))]">
            {group.emojis
              .filter(emoji => Number(emoji.emoji_version))
              .map((emoji) => (
                <button
                  key={emoji.slug}
                  className={cn('inline-flex aspect-square items-center justify-center overflow-hidden rounded-[25%] text-3xl', {
                    'bg-neutral-300/90 dark:bg-neutral-700/90': value === emoji.emoji,
                  })}
                  type="button"
                  onClick={() => {
                    onChange?.(emoji.emoji)
                  }}
                >{emoji.emoji}</button>
              ))}
          </div>
        </section>
      ))}

    </div>

  )
}
