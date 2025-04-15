import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useTranslation } from 'react-i18next'

import { COLORS } from '@/constants'
import useTheme from '@/hooks/useTheme'
import { changeLanguage } from '@/i18n'
import { useLanguage } from '@/contexts/LanguageContext'

export const Settings = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { currentLanguage, languages } = useLanguage()

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: COLORS[theme].text }]}>Settings!</Text>
      <Text style={[styles.title, { color: COLORS[theme].text }]}>
        {t('settings.language')}: {currentLanguage}
      </Text>

      {languages.map((language) => (
        <Pressable
          key={language.code}
          style={styles.button}
          onPress={() => changeLanguage(language.code)}
        >
          <Text>{language.name}</Text>
        </Pressable>
      ))}
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
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#dddddd',
    marginVertical: 10
  }
})

export default Settings
