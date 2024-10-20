import { useAuthActions } from '@convex-dev/auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'

import { signInFlow } from '@/features/types'
import { useState } from 'react'

import { TriangleAlert } from 'lucide-react'
import { redirect, useRouter } from 'next/navigation'

interface SignUpCardProps {
  setState: (state: signInFlow) => void
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const { signIn } = useAuthActions()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords does'nt match")
      return
    }

    setPending(true)
    signIn('password', { name, email, password, flow: 'signUp' })
      .then(() => router.push('/'))
      .catch(() => {
        setError('Something went wrong!!')
      })
      .finally(() => {
        setPending(false)
      })
  }

  const onProviderSignUp = (value: 'github' | 'google') => {
    setPending(true)
    signIn(value).finally(() => {
      setPending(false)
    })
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Sign up to continue. </CardTitle>
        <CardDescription>
          Use your email or another service to sign-up.
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} className="space-y-2.5 ">
          <Input
            disabled={pending}
            value={name}
            type="text"
            placeholder="Full Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            disabled={pending}
            value={email}
            type="Email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            disabled={pending}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />{' '}
          <Input
            type="password"
            disabled={pending}
            placeholder="Confirm Password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
          <Button disabled={pending} className="w-full" size="lg" type="submit">
            Sign up
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="w-full relative "
            disabled={pending}
            onClick={() => {
              onProviderSignUp('google')
            }}
            size="lg"
            variant="outline"
          >
            <FcGoogle className="size-5 absolute left-2.5 top-2.5" />
            Signup with Google
          </Button>
          <Button
            className="w-full relative "
            disabled={pending}
            onClick={() => {
              onProviderSignUp('github')
            }}
            size="lg"
            variant="outline"
          >
            <FaGithub className="size-5 absolute left-2.5 top-2.5 " />
            Signup with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?
          <span
            onClick={() => setState('signIn')}
            className="text-sky-400 hover:underline cursor-pointer"
          >
            {' '}
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
