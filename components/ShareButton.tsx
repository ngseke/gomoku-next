import { faLink, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Popover } from '@headlessui/react'
import { useState } from 'react'
import { usePopper } from 'react-popper'
import { Button } from './Button'
import { Input } from './Input'

function ShareBody ({ url }: { url?: string }) {
  function copy () {
    if (!url) return
    void navigator.clipboard.writeText(url)
  }

  return (
    <div className="flex min-w-96 flex-col items-start gap-3">
      <div className="flex items-center gap-3 text-lg font-bold">
        <FontAwesomeIcon
          className="text-xl text-neutral-600 dark:text-neutral-400"
          icon={faLink}
        />
        Invite Your Friend
      </div>

      <div className="grid w-full grid-cols-[1fr_auto] gap-2">
        <Input readOnly value={url} />
        <Button onClick={copy}>Copy</Button>
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
        className="z-10 rounded-2xl border border-neutral-200 bg-[#fdfbfb] p-4 text-left shadow-xl dark:border-neutral-800 dark:bg-[#020404]"
        style={styles.popper}
        {...attributes.popper}
      >
        <ShareBody url={url} />
      </Popover.Panel>
    </Popover>
  )
}
