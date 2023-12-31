import { getApps, getApp, initializeApp } from "@firebase/app"
import {
  User,
  signOut as _signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  getAuth,
} from "@firebase/auth"

import { router } from "expo-router"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()

type AuthContext = {
  isLoading: boolean
  user: User | null
}

const AuthContext = createContext<AuthContext>({
  isLoading: true,
  user: null,
})

export function AuthProvider(props: { children: ReactNode; [x: string]: any }) {
  const [session, setSession] = useState<AuthContext>({
    isLoading: true,
    user: null,
  })

  useEffect(() => {
    const auth = getAuth(app)
    return onAuthStateChanged(auth, (user) =>
      setSession({
        isLoading: false,
        user,
      })
    )
  }, [])

  return <AuthContext.Provider value={session} {...props} />
}

export async function signInWithGoogle() {
  const auth = getAuth(app)
  const provider = new GoogleAuthProvider()
  await signInWithPopup(auth, provider)
}

export async function signOut() {
  const auth = getAuth(app)
  await _signOut(auth)
}

export function useSession(
  { required }: { required: boolean } = { required: false }
) {
  const session = useContext(AuthContext)

  useEffect(() => {
    if (session.isLoading) return
    if (required && session.user === null) router.replace("/login")
  }, [session, required])

  return session
}
