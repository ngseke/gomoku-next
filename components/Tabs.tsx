import { cn } from '@/modules/cn'
import { Tab as BaseTab } from '@headlessui/react'
import { type ComponentProps, type ReactNode } from 'react'

interface Tab {
  name: ReactNode
  icon?: ReactNode
  panel: ReactNode
}

type TabsProps = ComponentProps<typeof BaseTab.Group> & {
  tabs: Tab[]
}

export function Tabs ({ tabs, ...restProps }: TabsProps) {
  return (
    <BaseTab.Group {...restProps}>
      <BaseTab.List className="flex space-x-1 rounded-xl bg-neutral-200 p-1 dark:bg-neutral-800">
        {tabs.map(({ name, icon }, index) => (
          <BaseTab
            key={index}
            className={({ selected }) => cn(
              'flex w-full items-center justify-center gap-2 rounded-lg py-1.5 text-sm font-medium',
              'ring-neutral-300 ring-white/60 ring-offset-2 ring-offset-transparent focus:outline-none focus:ring-2 dark:ring-neutral-700 ',
              selected
                ? 'bg-neutral-100 dark:bg-neutral-900'
                : ''
            )}
          >
            {icon}
            {name}
          </BaseTab>
        ))}
      </BaseTab.List>

      <BaseTab.Panels>
        {tabs.map(({ panel }, index) => (
          <BaseTab.Panel key={index} unmount={false}>
            {panel}
          </BaseTab.Panel>
        ))}
      </BaseTab.Panels>
    </BaseTab.Group>
  )
}
