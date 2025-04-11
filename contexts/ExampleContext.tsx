import React, { createContext, useContext, useState } from 'react'
import { ExampleContextType } from '@/types'

const ExampleContext = createContext<ExampleContextType | undefined>(undefined)

const ExampleProvider = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = useState<string>('example')

  return <ExampleContext.Provider value={{ value, setValue }}>{children}</ExampleContext.Provider>
}

const useExampleContext = (): ExampleContextType => {
  const context = useContext(ExampleContext)

  if (!context) throw new Error('useExampleContext must be used within a ExampleProvider')

  return context
}

export { ExampleProvider, useExampleContext }
