import React from 'react'
import { StyleSheet, View } from 'react-native'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'

import { ADS_IDS } from '@/constants/ads'

const AdBanner = ({ position = 'bottom' }) => {
  const ID = __DEV__ ? TestIds.ADAPTIVE_BANNER : ADS_IDS.BANNERS.GAME

  return (
    <View
      style={[
        styles.bannerAdContainer,
        position === 'top' ? styles.positionTop : styles.positionBottom
      ]}
    >
      <BannerAd unitId={ID} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} />
    </View>
  )
}

const styles = StyleSheet.create({
  positionTop: {
    top: 0
  },
  positionBottom: {
    bottom: 0
  },
  bannerAdContainer: {
    zIndex: 10,
    width: '100%',
    position: 'absolute',
    alignItems: 'center'
  }
})

export default AdBanner
