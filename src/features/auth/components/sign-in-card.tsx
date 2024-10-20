import { useAuthActions } from '@convex-dev/auth/react'

import { Button } from '@/components/ui/button'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import { TriangleAlert } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { signInFlow } from '@/features/types'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SignInCardProps {
  setState: (state: signInFlow) => void
}

export const SignInCard = ({ setState }: SignInCardProps) => {
  const { signIn } = useAuthActions()
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')

  const refreshPage = () => {
    window.location.reload()
  }

  const onPasswordSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPending(true)
    signIn('password', { email, password, flow: 'signIn' })
      .then(() => router.push('/auth'))
      .catch(() => {
        setError('Invalid Email or Password')
      })
      .finally(() => {
        setPending(false)
        refreshPage()
      })
  }

  const onProviderSignIn = (value: 'github' | 'google') => {
    setPending(true)
    signIn(value).finally(() => {
      setPending(false)
    })
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue </CardTitle>
        <CardDescription>
          Use your email or another service to sign-in
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignIn} className="space-y-2.5 ">
          <Input
            disabled={pending}
            value={email}
            type="Email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            disabled={pending}
            placeholder="Enter your password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <Button disabled={pending} className="w-full" size="lg" type="submit">
            Login
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="w-full relative "
            disabled={pending}
            onClick={() => {
              onProviderSignIn('google')
            }}
            size="lg"
            variant="outline"
          >
            <FcGoogle className="size-5 absolute left-2.5 top-2.5" />
            Login with Google
          </Button>
          <Button
            className="w-full relative "
            disabled={pending}
            onClick={() => onProviderSignIn('github')}
            size="lg"
            variant="outline"
          >
            <FaGithub className="size-5 absolute left-2.5 top-2.5 " />
            Login with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{' '}
          <span
            onClick={() => setState('signUp')}
            className="text-sky-400 hover:underline cursor-pointer"
          >
            {' '}
            Sign Up
          </span>
        </p>
      </CardContent>
    </Card>
  )
}
