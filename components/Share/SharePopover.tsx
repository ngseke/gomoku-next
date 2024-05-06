import { Popover } from '@headlessui/react'
import { useState, Fragment, cloneElement, type ReactElement } from 'react'
import { usePopper } from 'react-popper'
import { ShareBody } from './ShareBody'
import { useTranslations } from 'next-intl'

export function SharePopover ({ url, activator }: {
  url?: string
  activator: ReactElement
}) {
  const t = useTranslations()

  const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    strategy: 'fixed',
    modifiers: [
      { name: 'offset', options: { offset: [0, 8] } },
    ],
  })

  return (
    <Popover className="relative">
      <Popover.Button as={Fragment}>
        {cloneElement(activator, { ref: setReferenceElement })}
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        className="z-10 rounded-2xl border border-neutral-200 bg-[#fdfbfb] p-5 text-left shadow-xl dark:border-neutral-800 dark:bg-[#020404]"
        style={styles.popper}
        {...attributes.popper}
      >
        <h2 className="mb-3 flex text-lg font-bold">
          {t('share.title')}
        </h2>

        <ShareBody url={url} />
      </Popover.Panel>
    </Popover>
  )
}
