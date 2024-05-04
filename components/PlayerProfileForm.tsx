'use client'

import { useState } from 'react'
import { Input } from './Input'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { useFetchPlayer } from '@/hooks/useFetchPlayer'
import { Button } from './Button'
import { useAxios } from '@/hooks/useAxios'
import { EmojiPicker } from './EmojiPicker'
import { playerNameMaxLength } from '@/modules/constants'
import { usePlayer } from '@/hooks/usePlayer'

interface Inputs {
  name: string | null
  emoji: string | null
}

export function PlayerProfileForm ({ onFinish }: {
  onFinish?: () => void
}) {
  const { player } = usePlayer()
  const { register, handleSubmit, watch, setValue } = useForm<Inputs>({
    defaultValues: player ?? {},
  })

  const { refetchGlobalPlayer } = useFetchPlayer()
  const axios = useAxios()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setIsSubmitting(true)
    try {
      await axios.patch('/api/player', data)
      await refetchGlobalPlayer()
      onFinish?.()
    } catch (err) {
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      className="flex flex-wrap gap-6 py-2 sm:flex-nowrap"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex-none pt-2 sm:w-auto">
        <span className="flex aspect-square w-32 flex-none items-center justify-center overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
          <span className="select-none text-8xl">{watch('emoji')}</span>
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <Input
          label="Name"
          maxLength={playerNameMaxLength}
          {...register('name', { required: true })}
        />

        <EmojiPicker
          value={watch('emoji')}
          onChange={(emoji) => { setValue('emoji', emoji) }}
        />

        <Button loading={isSubmitting} type="submit">Save</Button>
      </div>
    </form>
  )
}
