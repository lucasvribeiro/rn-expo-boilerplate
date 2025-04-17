import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import Purchases, { PurchasesPackage } from 'react-native-purchases'

const Store = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [product, setProduct] = useState<PurchasesPackage | null>(null)
  const [purchaseStatus, setPurchaseStatus] = useState<string>('')
  const [isPurchased, setIsPurchased] = useState<boolean>(false)

  useEffect(() => {
    loadProduct()
    checkPurchaseStatus()
  }, [])

  const loadProduct = async () => {
    try {
      setLoading(true)

      const offerings = await Purchases.getOfferings()

      if (offerings.current && offerings.current.availablePackages.length > 0) {
        setProduct(offerings.current.availablePackages[0])
      } else {
        console.log('Não foi possível carregar os produtos disponíveis.')
      }
    } catch (error) {
      console.log('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkPurchaseStatus = async () => {
    try {
      const customerInfo = await Purchases.getCustomerInfo()
      const removeAdsEntitlement = customerInfo.entitlements.active['no_ads']

      if (removeAdsEntitlement) {
        console.log('Usuário já possui o entitlement no_ads')
        setIsPurchased(true)
      } else {
        console.log('Usuário não possui o entitlement no_ads')
        setIsPurchased(false)
      }
    } catch (error) {
      console.log('Erro ao verificar status da assinatura:', error)
    }
  }

  const handlePurchase = async () => {
    if (!product) {
      console.log('Nenhum produto disponível para compra')
      return
    }

    try {
      setLoading(true)
      setPurchaseStatus('iniciando')

      const { customerInfo, productIdentifier } = await Purchases.purchasePackage(product)
      console.log('Compra realizada com sucesso!', { productIdentifier })
      setPurchaseStatus('sucesso')

      const removeAdsEntitlement = customerInfo.entitlements.active['no_ads']

      if (removeAdsEntitlement) {
        console.log('Entitlement "no_ads" ativado com sucesso!')
        setIsPurchased(true)
      } else {
        console.log('Entitlement não encontrado após a compra.')
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'userCancelled') {
        console.log('Usuário cancelou a compra')
        setPurchaseStatus('cancelado')
      } else {
        console.log('Erro durante a compra:', error)
        setPurchaseStatus('erro')
      }
    } finally {
      setLoading(false)
    }
  }

  const restorePurchases = async () => {
    try {
      setLoading(true)
      console.log('Restaurando compras anteriores...')

      const customerInfo = await Purchases.restorePurchases()
      console.log('Restauração concluída:', customerInfo)

      const removeAdsEntitlement = customerInfo.entitlements.active['no_ads']

      if (removeAdsEntitlement) {
        console.log('Entitlement "no_ads" restaurado com sucesso!')
        setIsPurchased(true)
      } else {
        console.log('Nenhum entitlement encontrado para restaurar')
      }
    } catch (error) {
      console.log('Erro ao restaurar compras:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {isPurchased ? (
          <View style={styles.purchasedContainer}>
            <Text style={styles.purchasedText}>Ads Already Removed!</Text>
          </View>
        ) : (
          <>
            {product && (
              <View style={styles.priceContainer}>
                <Text style={styles.priceLabel}>Price:</Text>
                <Text style={styles.price}>{product.product.priceString}</Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={handlePurchase}
              disabled={loading || !product}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>{!product ? 'Loading...' : 'Remove Ads Now'}</Text>
              )}
            </TouchableOpacity>

            {purchaseStatus === 'sucesso' && (
              <Text style={styles.successText}>Purchase successful!</Text>
            )}

            {purchaseStatus === 'erro' && (
              <Text style={styles.errorText}>Error processing purchase.</Text>
            )}

            {purchaseStatus === 'cancelado' && (
              <Text style={styles.cancelText}>Purchase cancelled by user.</Text>
            )}
          </>
        )}

        <TouchableOpacity
          style={styles.restoreButton}
          onPress={restorePurchases}
          disabled={loading}
        >
          <Text style={styles.restoreText}>Restore Previous Purchases</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 30
  },
  purchasedContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    marginVertical: 20
  },
  purchasedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8
  },
  enjoyText: {
    fontSize: 16,
    color: '#2E7D32'
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  priceLabel: {
    fontSize: 18,
    color: '#333333',
    marginRight: 10
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A90E2'
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  },
  restoreButton: {
    marginTop: 16,
    paddingVertical: 10
  },
  restoreText: {
    color: '#4A90E2',
    fontSize: 16
  },
  successText: {
    color: '#4CAF50',
    marginTop: 10,
    fontSize: 16
  },
  errorText: {
    color: '#F44336',
    marginTop: 10,
    fontSize: 16
  },
  cancelText: {
    color: '#FF9800',
    marginTop: 10,
    fontSize: 16
  }
})

export default Store
