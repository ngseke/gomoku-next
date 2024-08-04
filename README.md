# Gomoku Next

## Development

Create a .env file from the example file:

```bash
cp .env.example .env
```

- `NEXT_PUBLIC_FIREBASE_CONFIG`: You can obtain the config from the Firebase Console under Settings -> General. Convert it to a JSON string like `{"apiKey":"","authDomain":"","projectId":"","storageBucket":"","messagingSenderId":"","appId":"","databaseURL":""}`
- `GOOGLE_APPLICATION_CREDENTIALS`: Run the development server: Go to Firebase Console under Settings -> Cloud Messaging -> Manage Service Accounts. In Cloud Console, IAM & Admin -> Service Accounts -> Keys -> Add Keys

```bash
pnpm i
pnpm run dev
```
