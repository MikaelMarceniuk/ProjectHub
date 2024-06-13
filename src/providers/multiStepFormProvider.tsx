'use client'

import withChildren from '@/@types/withChildren'
import { MultistepFormType } from '@/hooks/useMultistepform'
import { createContext, useContext } from 'react'

const MultistepFormContext = createContext<MultistepFormType>(
	{} as MultistepFormType,
)

export const useMultistepFormContext = () => useContext(MultistepFormContext)

type MultstepFormProviderProps = MultistepFormType & withChildren

const MultistepFormProvider: React.FC<MultstepFormProviderProps> = ({
	children,
	...multistepProps
}) => {
	return (
		<MultistepFormContext.Provider value={multistepProps}>
			{children}
		</MultistepFormContext.Provider>
	)
}

export default MultistepFormProvider
