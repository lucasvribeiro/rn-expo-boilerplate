import { ReactNode } from 'react'
import { Modal as RNModal, StyleSheet, Pressable, View } from 'react-native'

import { COLORS } from '@/constants'
import { DEFAULT_SHADOW } from '@/constants'
import useTheme from '@/hooks/useTheme'

type ModalProps = {
  visible: boolean
  onClose: () => void
  children: ReactNode
}

const Modal = ({ visible, children, onClose }: ModalProps) => {
  const { theme } = useTheme()

  return (
    <RNModal visible={visible} onRequestClose={onClose} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <Pressable onPress={onClose} style={styles.overlayTouchable}>
          <Pressable
            onPress={(e) => e.stopPropagation()}
            style={[styles.modalContent, { backgroundColor: COLORS[theme].backgroundLight }]}
          >
            {children}
          </Pressable>
        </Pressable>
      </View>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1
  },
  overlayTouchable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#000000CC'
  },
  modalContent: {
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...DEFAULT_SHADOW
  }
})

export default Modal
