import { faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from '@headlessui/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import { Button } from './Button'
import { Input } from './Input'
import { useTranslations } from 'next-intl'

function ShareBody ({ url }: { url?: string }) {
  const t = useTranslations()

  function copy () {
    if (!url) return
    void navigator.clipboard.writeText(url)
  }

  return (
    <div className="flex min-w-96 flex-col items-start gap-3">
      <h2 className="flex items-center gap-3 text-lg font-bold">
        {t('share.title')}
      </h2>

      <div className="grid w-full grid-cols-[1fr_auto] gap-2">
        <Input
          readOnly
          leftSection={<FontAwesomeIcon icon={faLink} />}
          value={url}
        />
        <Button onClick={copy}>{t('action.copy')}</Button>
      </div>
    </div>
  )
}

export function ShareButton ({ url }: { url?: string }) {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] =
    useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
    ],
  })

  return (
    <Popover className="relative">
      <Popover.Button
        ref={setReferenceElement}
        as={Button}
        icon={<FontAwesomeIcon icon={faShareNodes} />}
      />
      <Popover.Panel
        ref={setPopperElement}
        className="z-10 rounded-2xl border border-neutral-200 bg-[#fdfbfb] p-5 text-left shadow-xl dark:border-neutral-800 dark:bg-[#020404]"
        style={styles.popper}
        {...attributes.popper}
      >
        <ShareBody url={url} />
      </Popover.Panel>
    </Popover>
  )
}
