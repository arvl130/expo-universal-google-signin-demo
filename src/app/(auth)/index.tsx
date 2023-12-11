import { Button, Image, Text, View } from "react-native"
import { useState } from "react"
import { signOut, useSession } from "@/utils/auth"

export default function HomePage() {
  const { user } = useSession()
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
            uri: user?.photoURL!,
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
          Welcome, {user?.displayName}. 😊
        </Text>
        <Button
          title="Logout"
          disabled={isSigningOut}
          onPress={async () => {
            setIsSigningOut(true)
            try {
              await signOut()
            } finally {
              setIsSigningOut(false)
            }
          }}
        />
      </View>
    </View>
  )
}
