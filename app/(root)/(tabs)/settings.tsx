import { StyleSheet, Text, View } from 'react-native'

import { COLORS } from '@/constants'
import useTheme from '@/hooks/useTheme'

export const Settings = () => {
  const { theme } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: COLORS[theme].text }]}>Settings!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    color: 'black',
    fontFamily: 'Nunito-Black'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Settings
