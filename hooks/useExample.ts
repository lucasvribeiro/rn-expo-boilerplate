import { useState, useCallback } from 'react'

const useExample = (initialValue = false) => {
  const [value, setValue] = useState(initialValue)

  const updateValue = useCallback((newValue: boolean) => {
    setValue(newValue)
  }, [])

  return [value, updateValue]
}

export default useExample
