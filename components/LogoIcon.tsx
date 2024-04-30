import { Piece } from './GomokuBoard/Piece'

export function LogoIcon () {
  return (
    <div
      className="relative size-16"
    >
      <div
        className="absolute inset-0 flex origin-right -translate-x-3 -translate-y-2 items-center justify-center bg-red-400/0"
      >
        <Piece className="size-10" color="black" />
      </div>
      <div
        className="absolute inset-0 flex origin-left translate-x-3 translate-y-2 items-center justify-center bg-blue-500/0"
      >
        <Piece className="size-10" color="white" />
      </div>
    </div>
  )
}
