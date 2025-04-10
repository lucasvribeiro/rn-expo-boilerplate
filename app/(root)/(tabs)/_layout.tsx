import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

import { COLORS } from '@/constants'
import useTheme from '@/hooks/useTheme'

const TabLayout = () => {
  const { theme } = useTheme()

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIconStyle: { margin: 'auto' },
        tabBarActiveTintColor: COLORS[theme].text,
        tabBarInactiveTintColor: COLORS[theme].textLight
      }}
    >
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'settings' : 'settings-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={24} />
          )
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          tabBarIcon: ({ focused, color }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24} />
          )
        }}
      />
    </Tabs>
  )
}

export default TabLayout
