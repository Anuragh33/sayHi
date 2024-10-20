'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useCurrentUsers } from '../api/use-current-users'
import { Loader, LogOut } from 'lucide-react'
import { useAuthActions } from '@convex-dev/auth/react'
import { useRouter } from 'next/navigation'

export const UserButton = () => {
  const { signOut } = useAuthActions()

  const router = useRouter()

  const { data, isLoading } = useCurrentUsers()

  if (isLoading)
    return <Loader className="size-4 animate-spin text-muted-foreground" />

  if (!data) return null

  const { name, email, image } = data

  const avatarFallBack = name!.charAt(0).toUpperCase()

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback className="bg-green-700 text-white">
            {avatarFallBack}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" side="right" className="w-60">
        <DropdownMenuItem
          className="h-10"
          onClick={() => signOut().then(() => router.push('/'))}
        >
          <LogOut className="size-4 mr-2 " />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
