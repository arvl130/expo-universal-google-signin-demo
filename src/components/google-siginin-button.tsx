import { Button } from "react-native"
import { useState } from "react"
import { signInWithGoogle } from "@/utils/auth"

export function GoogleSignInButton() {
  const [isSigningIn, setIsSigningIn] = useState(false)

  return (
    <Button
      title="Google Sign-In"
      disabled={isSigningIn}
      onPress={async () => {
        setIsSigningIn(true)
        try {
          await signInWithGoogle()
        } catch (e) {
          console.log("An error occured", e)
          setIsSigningIn(false)
        }
      }}
    />
  )
}
