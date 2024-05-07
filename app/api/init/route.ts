import { firebaseAdminAuth, firebaseAdminDatabase } from '@/modules/firebaseAdmin/firebaseAdmin'
import { rules } from '@/modules/firebaseAdmin/rules'

export async function POST () {
  await firebaseAdminDatabase.ref().set({})
  await setRules()
  await deleteAnonymousUsers()

  return new Response(null, { status: 204 })
}

async function deleteAnonymousUsers (nextPageToken?: string) {
  const { users, pageToken } =
    await firebaseAdminAuth.listUsers(20, nextPageToken)

  await Promise.allSettled(users.map(async (user) => {
    const isAnonymous = (user.providerData.length === 0)
    if (isAnonymous) {
      await firebaseAdminAuth.deleteUser(user.uid)
      console.log(`\`${user.uid}\` deleted.`)
    }
  }))

  if (pageToken) {
    await deleteAnonymousUsers(pageToken)
  }
}

async function setRules () {
  await firebaseAdminDatabase.setRules(
    JSON.stringify(rules, null, 2)
  )
}
