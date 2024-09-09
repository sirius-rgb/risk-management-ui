import { StateCreator } from "zustand"

export interface Banner {
  isBannerOpen: boolean
  openBanner: (isBannerOpen: boolean) => void
  closeBanner: (isBannerOpen: boolean) => void
}

export const createBannerSlice: StateCreator<Banner> = (set) => ({
  isBannerOpen: false,
  openBanner: () => set({ isBannerOpen: true }),
  closeBanner: () => set({ isBannerOpen: false }),
})
