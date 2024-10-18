import { act, renderHook } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { useStore } from "../../../src/store/index"

describe("Feedback Slice", () => {
  // const useStore = create<Feedback>((set) => ({
  //   ...createFeedbackSlice(set),
  // }))

  it("should initialize with default values", () => {
    // const { result } = renderHook(() => useStore())
    const { result } = renderHook(() => useStore())
    expect(result.current.feedback).toBe("")
    expect(result.current.rating).toBe(0)
    expect(result.current.hoverRating).toBe(0)
    expect(result.current.rated).toBe(false)
    expect(result.current.isFeedbackDialogOpen).toBe(false)
  })

  it("should update feedback", () => {
    // const { result } = renderHook(() => useStore())
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.setFeedback("Great job!")
    })
    expect(result.current.feedback).toBe("Great job!")
  })

  it("should update rating", () => {
    // const { result } = renderHook(() => useStore())
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.setRating(5)
    })
    expect(result.current.rating).toBe(5)
    expect(result.current.rated).toBe(true)
  })

  it("should open and close feedback dialog", () => {
    const { result } = renderHook(() => useStore())
    act(() => {
      result.current.setFeedbackDialogOpen(true)
    })
    expect(result.current.isFeedbackDialogOpen).toBe(true)

    act(() => {
      result.current.setFeedbackDialogOpen(false)
    })
    expect(result.current.isFeedbackDialogOpen).toBe(false)
  })
})
