'use client'

import { Button } from '@/components/shadcn/button'
import { Separator } from '@/components/shadcn/separator'
import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'

enum EAvailableSignIn {
  GITHUB = 'GITHUB',
  DISCORD = 'DISCORD',
  EMAIL_AND_PASSWORD = 'EMAIL_AND_PASSWORD',
  NO_ACCOUNT = 'NO_ACCOUNT',
}

const LoginPage: NextPage = () => {
  const handleSignIn = (key: keyof typeof EAvailableSignIn) => () => {
    switch (key) {
      case 'GITHUB': {
        console.log('Loggin in with', key)
        break
      }

      case 'DISCORD': {
        console.log('Loggin in with', key)
        break
      }

      case 'EMAIL_AND_PASSWORD': {
        console.log('Loggin in with', key)
        break
      }

      case 'NO_ACCOUNT': {
        console.log('Loggin in with', key)
        break
      }
    }
  }

  return (
    <div className="h-full flex flex-col items-center">
      <div className="flex flex-col flex-1 mt-40">
        <h1 className="text-center text-3xl font-bold mb-10">
          Log in to Project Hub
        </h1>
        <div className="w-80 flex flex-col gap-2">
          <Button
            size="xlg"
            className="bg-github flex gap-2 hover:bg-github/90 dark:text-white"
            onClick={handleSignIn('GITHUB')}
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
            onClick={handleSignIn('DISCORD')}
          >
            <Image
              src="/discord-mark-white.svg"
              alt="github logo"
              width={20}
              height={20}
            />
            Continue with Discord
          </Button>
          <Separator className="my-2" />
          <Button
            size="xlg"
            variant="outline"
            onClick={handleSignIn('EMAIL_AND_PASSWORD')}
          >
            Continue with Email
          </Button>
          <Button
            size="xlg"
            variant="outline"
            onClick={handleSignIn('NO_ACCOUNT')}
          >
            Continue without account
          </Button>
        </div>
      </div>
      <div className="w-full h-24 border-t border-b flex items-center justify-center">
        <Link
          href="/signup"
          className="text-link underline-offset-4 hover:underline"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
