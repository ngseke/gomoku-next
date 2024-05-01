import { cn } from '@/modules/cn'
import { Tab as BaseTab } from '@headlessui/react'
import { type ReactNode } from 'react'

interface Tab {
  name: ReactNode
  panel: ReactNode
}

export function Tabs ({ tabs }: { tabs: Tab[] }) {
  return (
    <BaseTab.Group>
      <BaseTab.List className="flex space-x-1 rounded-xl bg-neutral-200 p-1 dark:bg-neutral-800">
        {tabs.map(({ name }, index) => (
          <BaseTab
            key={index}
            className={({ selected }) => cn(
              'w-full rounded-lg py-1.5 text-sm font-medium',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-neutral-100 font-bold dark:bg-neutral-900'
                : ''
            )}
          >{name}</BaseTab>
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
