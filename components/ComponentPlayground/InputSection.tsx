'use client'
import { useState } from 'react'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Input } from '../Input'
import { Headline } from './Headline'

export function InputSection () {
  const [text, setText] = useState('Gomoku Next')

  return (<>
    <Headline>Input</Headline>
    <div className="grid gap-2 sm:grid-cols-2">
      {([undefined, <FontAwesomeIcon key="icon" className="text-rose-500" icon={faTriangleExclamation} />] as const).map(rightSection => (
        (['md', 'sm'] as const).map(size => (
          [false, true].map(disabled => (
            <Input
              key={[disabled, size].join()}
              disabled={disabled}
              rightSection={rightSection}
              size={size}
              value={text}
              onChange={event => { setText(event.target.value) }}
            />
          ))
        ))
      ))}
    </div>
  </>)
}
