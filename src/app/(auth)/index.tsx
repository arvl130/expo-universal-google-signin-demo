import { Button, Image, Text, View } from "react-native"
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { useState } from "react"

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
})

export default function HomePage() {
  const [isSigningOut, setIsSigningOut] = useState(false)

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <Image
          borderRadius={100}
          style={{
            height: 100,
            width: 100,
          }}
          source={{
            uri: auth().currentUser?.photoURL!,
          }}
        />
      </View>

      <View>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 12,
          }}
        >
          Welcome, {auth().currentUser?.displayName}. 😊
        </Text>
        <Button
          title="Logout"
          disabled={isSigningOut}
          onPress={async () => {
            setIsSigningOut(true)
            try {
              await auth().signOut()
              await GoogleSignin.revokeAccess()
              await GoogleSignin.signOut()
            } finally {
              setIsSigningOut(false)
            }
          }}
        />
      </View>
    </View>
  )
}
