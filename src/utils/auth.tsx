import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth"

import { router } from "expo-router"
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

type AuthContext = {
  isLoading: boolean
  user: FirebaseAuthTypes.User | null
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
    return auth().onAuthStateChanged((user) =>
      setSession({
        isLoading: false,
        user,
      })
    )
  }, [])

  return <AuthContext.Provider value={session} {...props} />
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
