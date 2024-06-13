'use client'

import { Button } from '@/components/shadcn/button'
import { useMultistepFormContext } from '@/providers/useMultiStepFormProvider'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

const ConnectToProviderForm: React.FC = () => {
  const { next } = useMultistepFormContext()
  const form = useFormContext()

  useEffect(() => {
    form.reset()
  }, [])

  return (
    <div className="w-80 flex flex-col flex-1 mt-40">
      <h1 className="text-center text-3xl font-bold mb-10">
        Let&apos;s connect to a provider
      </h1>
      <div className="flex flex-col gap-2">
        <Button
          size="xlg"
          className="bg-github flex gap-2 hover:bg-github/90 dark:text-white"
        >
          <Image
            src="/github-mark-white.svg"
            alt="github logo"
            width={20}
            height={20}
          />
          Continue with Github
        </Button>
        <Button
          size="xlg"
          className="bg-discord flex gap-2 hover:bg-discord/90 dark:text-white"
        >
          <Image
            src="/discord-mark-white.svg"
            alt="github logo"
            width={20}
            height={20}
          />
          Continue with Discord
        </Button>
        <Button
          size="xlg"
          variant="linkIconHover2"
          Icon={ArrowRight}
          iconPlacement="right"
          className="text-link flex gap-2 after:bg-link"
          onClick={next}
        >
          Continue with Email
        </Button>
      </div>
    </div>
  )
}

export default ConnectToProviderForm
