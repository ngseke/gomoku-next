import { parseAuthorization } from '@/modules/parseAuthorization'

export async function POST (
  request: Request,
  { params }: { params: { uid: string } }
) {
  const me = await parseAuthorization(request)

  return Response.json(me)
}
