import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Transition, Dialog as BaseDialog } from '@headlessui/react'
import { Fragment, type ReactNode, forwardRef, type PropsWithChildren, type ComponentProps } from 'react'

const Overlay = forwardRef<HTMLDivElement>(function Overlay (_props, ref) {
  return (
    <div ref={ref} className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
  )
})

function CloseButton (props: ComponentProps<'button'>) {
  return (
    <button
      className="aspect-square px-2 text-neutral-600 dark:text-neutral-400"
      type="button"
      {...props}
    >
      <FontAwesomeIcon icon={faXmark} />
    </button>
  )
}

export type DialogProps = PropsWithChildren<{
  open: boolean
  onClose?: () => void
  title?: ReactNode
}>

export function Dialog ({ open, onClose, title, children }: DialogProps) {
  return (
    <Transition appear as={Fragment} show={open}>
      <BaseDialog
        as="div"
        className="relative z-20"
        onClose={onClose ?? (() => {})}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Overlay />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              leave="ease-in duration-100"
              leaveTo="opacity-0 scale-95"
            >
              <BaseDialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl border border-neutral-200 bg-[#fdfbfb] p-6 text-left align-middle shadow-xl transition-all dark:border-neutral-800 dark:bg-[#020404]">
                {(title ?? onClose) &&
                  <BaseDialog.Title
                    as="h3"
                    className="mb-2 flex justify-between text-lg font-bold"
                  >
                    {title}

                    {onClose && <CloseButton onClick={onClose} />}
                  </BaseDialog.Title>}

                {children}
              </BaseDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </BaseDialog>
    </Transition>
  )
}
