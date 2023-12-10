import { useSession } from "@/utils/auth"
import { Stack } from "expo-router"

export default function Layout() {
  const { isLoading } = useSession({
    required: true,
  })

  if (isLoading) return <></>

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
    </Stack>
  )
}
