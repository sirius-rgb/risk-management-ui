import { create } from "zustand"

import { BearSlice, createBearSlice } from "./bearSlice"
import { CounterSlice, createCounterSlice } from "./counterSlice"
import { createIssueSlice, IssueSlice } from "./IssueSlice"

type StoreState = CounterSlice & BearSlice & IssueSlice

export const useStore = create<StoreState>()((...a) => ({
  ...createCounterSlice(...a),
  ...createBearSlice(...a),
  ...createIssueSlice(...a),
}))
