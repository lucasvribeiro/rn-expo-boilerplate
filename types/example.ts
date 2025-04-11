export interface Example {
  string: string
  number?: number
  boolean: boolean
  array: string[]
  union: 'example1' | 'example2' | 'example3'
  unionArray: ('example1' | 'example2' | 'example3')[]
  record: Record<string, unknown>
  date: Date
  tuple: [number, number]
  object: {
    prop1: string
    prop2: number
    prop3: boolean
  }

  onFunction: (data: Partial<Example>) => void
}

export type ExampleType = 'example1' | 'example2' | 'example3'

export type ExampleContextType = {
  value: string
  setValue: (value: string) => void
}
