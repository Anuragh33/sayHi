'use client'

import { SignInCard } from '@/features/auth/components/sign-in-card'
import { SignUpCard } from '@/features/auth/components/sign-up-card'
import { signInFlow } from '@/features/types'
import { useState } from 'react'

export default function AuthScreen() {
  const [state, setState] = useState<signInFlow>('signIn')

  return (
    <div className="h-full flex items-center justify-center bg-[#86D293]">
      <div className="md:h-auto md:w-[420px]">
        {state === 'signIn' ? (
          <SignInCard setState={setState} />
        ) : (
          <SignUpCard setState={setState} />
        )}
      </div>
    </div>
  )
}
