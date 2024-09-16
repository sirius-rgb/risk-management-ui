import { create } from "zustand"

import { Auth, createAuthSlice } from "./auth"
import { Banner, createBannerSlice } from "./banner"
import { createFeedbackSlice, Feedback } from "./feedback"
import { createIssueSlice, Issue } from "./issue"
import { createTAndCSlice, TermsAndConditions } from "./tAndC"

type StoreState = Issue & Feedback & TermsAndConditions & Banner & Auth

export const useStore = create<StoreState>()((...a) => ({
  ...createIssueSlice(...a),
  ...createFeedbackSlice(...a),
  ...createTAndCSlice(...a),
  ...createBannerSlice(...a),
  ...createAuthSlice(...a),
}))
