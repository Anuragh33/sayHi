'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useCreateWorkspace } from '../api/use-create-workspace'
import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export const CreateWorkspaceModal = () => {
  const router = useRouter()

  const [name, setName] = useState('')

  const [open, setOpen] = useCreateWorkspaceModal()

  const { mutate, isPending, isError, isSuccess, data, error } =
    useCreateWorkspace()

  const handleCloseFunction = () => {
    setOpen(false)
    setName('')
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    mutate(
      {
        name,
      },
      {
        onSuccess(id) {
          toast('Workspace has been created!!')
          router.push(`/workspace/${id}`)
          handleCloseFunction()
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseFunction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isPending}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace Name e.g. 'Work', 'Personal', 'Home' "
          />
          <div className=" flex justify-end">
            <Button disabled={isPending}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
