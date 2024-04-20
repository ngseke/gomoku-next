import { credential } from 'firebase-admin'
import { type ServiceAccount, initializeApp } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'
import { getDatabase } from 'firebase-admin/database'
import { firebaseConfig } from '../firebase'
import { nanoid } from '@reduxjs/toolkit'

function getServiceAccount () {
  const raw = process.env.GOOGLE_APPLICATION_CREDENTIALS
  if (!raw) throw new Error('Missing env `GOOGLE_APPLICATION_CREDENTIALS`!')

  return JSON.parse(raw) as ServiceAccount
}

const serviceAccount = getServiceAccount()

const app = initializeApp({
  ...firebaseConfig,
  credential: credential.cert(serviceAccount),
}, nanoid())

export const firebaseAdminAuth = getAuth(app)

export const firebaseAdminDatabase = getDatabase(app)
