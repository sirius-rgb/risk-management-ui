import { createContext, useContext } from "react"
import { createStore, useStore as useZustandStore } from "zustand"

import { PreloadedStoreInterface } from "./StoreProvider"

export interface StoreInterface {
  lastUpdate: number
  light: boolean
  count: number
  proposedIssueTitle: string
  proposedIssueDescription: string
  tick: (lastUpdate: number) => void
  setProposedIssueTitle: (title: string) => void
  setProposedIssueDescription: (description: string) => void
}

function getDefaultInitialState() {
  return {
    lastUpdate: new Date(1970, 1, 1).getTime(),
    light: false,
    count: 2,
    proposedIssueTitle: "",
    proposedIssueDescription: "",
  } as const
}

export type StoreType = ReturnType<typeof initializeStore>

const storeContext = createContext<StoreType | null>(null)

export const Provider = storeContext.Provider

export function useStore<T>(selector: (state: StoreInterface) => T) {
  const store = useContext(storeContext)

  if (!store) throw new Error("Store is missing the provider")

  return useZustandStore(store, selector)
}

export function initializeStore(preloadedState: PreloadedStoreInterface) {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    tick: (lastUpdate) =>
      set({
        lastUpdate,
        light: !get().light,
      }),
    setProposedIssueTitle: (title) => set({ proposedIssueTitle: title }),
    setProposedIssueDescription: (description) =>
      set({ proposedIssueDescription: description }),
  }))
}
