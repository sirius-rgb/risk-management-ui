import { create } from "zustand"

import { Auth, createAuthSlice } from "./auth"
import { Banner, createBannerSlice } from "./banner"
import { createIssueSlice, Issue } from "./issue"
import { createRateSlice, Rate } from "./rate"
import { createTAndCSlice, TermsAndConditions } from "./tAndC"

type StoreState = Issue & Rate & TermsAndConditions & Banner & Auth

export const useStore = create<StoreState>()((...a) => ({
  ...createIssueSlice(...a),
  ...createRateSlice(...a),
  ...createTAndCSlice(...a),
  ...createBannerSlice(...a),
  ...createAuthSlice(...a),
}))
