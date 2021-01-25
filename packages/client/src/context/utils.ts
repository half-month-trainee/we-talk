import { Dispatch, SetStateAction } from 'react'

export type ContextValue<T> = {
  data: T,
  setData: Dispatch<SetStateAction<T>>
}

export function initContextValue<T> (value: T): ContextValue<T> {
  return {
    data: value,
    setData: () => {}
  }
}
