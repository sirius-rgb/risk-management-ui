import { format, subMonths } from "date-fns"
import { create } from "zustand"

interface FilterState {
  startDate: string
  endDate: string
  setStartDate: (date: string) => void
  setEndDate: (date: string) => void
  resetDateRange: () => void
}

const defaultStartDate = format(subMonths(new Date(), 3), "yyyy-MM-dd")
const defaultEndDate = format(new Date(), "yyyy-MM-dd")

export const useFilterStore = create<FilterState>((set) => ({
  startDate: defaultStartDate,
  endDate: defaultEndDate,
  setStartDate: (date: string) => set({ startDate: date }),
  setEndDate: (date: string) => set({ endDate: date }),
  resetDateRange: () =>
    set({
      startDate: defaultStartDate,
      endDate: defaultEndDate,
    }),
}))
