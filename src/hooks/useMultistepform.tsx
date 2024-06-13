import { ReactElement, useState } from 'react'

export type MultistepFormType = {
  steps: ReactElement[]
  currentStepIndex: number
  currentStep: ReactElement
  maxStep: number
  isFirstStep: boolean
  isLastStep: boolean
  next: () => void
  back: () => void
  goTo: (index: number) => void
}

const useMultistepForm = (steps: ReactElement[]): MultistepFormType => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)

  const next = () =>
    setCurrentStepIndex((step) => (step >= steps.length - 1 ? step : step + 1))

  const back = () =>
    setCurrentStepIndex((step) => (step <= 0 ? step : step - 1))

  const goTo = (index: number) => setCurrentStepIndex(index)

  return {
    steps,
    currentStepIndex,
    currentStep: steps[currentStepIndex],
    maxStep: steps.length,
    isFirstStep: currentStepIndex == 0,
    isLastStep: steps.length == currentStepIndex,
    next,
    back,
    goTo,
  }
}

export default useMultistepForm
