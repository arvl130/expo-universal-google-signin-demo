import { Button } from "react-native"
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useState } from "react"

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
})

export function GoogleSignInButton() {
  const [isSigningIn, setIsSigningIn] = useState(false)

  return (
    <Button
      title="Google Sign-In"
      disabled={isSigningIn}
      onPress={async () => {
        setIsSigningIn(true)
        try {
          // Check if your device supports Google Play
          await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true,
          })

          // Get the users ID token
          const { idToken } = await GoogleSignin.signIn()

          // Create a Google credential with the token
          const googleCredential = auth.GoogleAuthProvider.credential(idToken)

          // Sign-in the user with the credential
          await auth().signInWithCredential(googleCredential)

          console.log("Signed in with Google!")
        } catch (e) {
          console.log("An error occured", e)
          setIsSigningIn(false)
        }
      }}
    />
  )
}
