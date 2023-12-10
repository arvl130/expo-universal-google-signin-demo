import { GoogleSignInButton } from "@/components/google-siginin-button"
import { Text, View } from "react-native"
import { useEffect } from "react"
import { useSession } from "@/utils/auth"
import { router } from "expo-router"

export default function LoginPage() {
  const { isLoading, user } = useSession()

  useEffect(() => {
    if (isLoading) return
    if (user) router.replace("/(auth)")
  }, [isLoading, user])

  return (
    <View
      style={{
        paddingVertical: 12,
        paddingHorizontal: 16,
      }}
    >
      <Text
        style={{
          marginBottom: 12,
          textAlign: "center",
        }}
      >
        This is the Login page.
      </Text>
      <GoogleSignInButton />
    </View>
  )
}
