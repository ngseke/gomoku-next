import { type Nullish } from '@/types/Nullish'
import { faHashtag } from '@fortawesome/free-solid-svg-icons'
import { Tag } from './Tag'

export function RoomIdHashtag ({ roomId }: { roomId: Nullish<string> }) {
  return (
    <Tag
      icon={faHashtag}
      text={roomId}
      title={`Room ID: ${roomId}`}
    />
  )
}
