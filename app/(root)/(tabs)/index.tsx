import { StyleSheet, Text, View, Pressable } from 'react-native'

import { COLORS } from '@/constants'
import useTheme from '@/hooks/useTheme'
import GradientExample from '@/components/GradientExample'

export const Home = () => {
  const { setTheme, theme } = useTheme()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: COLORS[theme].text }]}>My boilerplate!</Text>

      <View style={styles.buttons}>
        <Pressable style={styles.button} onPress={() => setTheme('dark')}>
          <Text>Dark Theme</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => setTheme('light')}>
          <Text>Light Theme</Text>
        </Pressable>

        <GradientExample />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Nunito-Black',
    fontSize: 24
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#dddddd',
    marginVertical: 10
  },
  buttons: {
    bottom: 100,
    position: 'absolute'
  }
})

export default Home
