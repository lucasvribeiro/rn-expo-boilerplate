import { LinearGradient } from 'expo-linear-gradient'
import { StyleSheet, Text } from 'react-native'

const GradientExample = () => {
  return (
    <LinearGradient
      style={styles.button}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={['#4c669f', '#3b5998', '#192f6a']}
    >
      <Text style={styles.text}>Gradient Button</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  text: {
    color: '#fff',
    fontFamily: 'Nunito-Black'
  }
})

export default GradientExample
