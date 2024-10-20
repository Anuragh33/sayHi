'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'

import { useCreateWorkspaceModal } from '../store/use-create-workspace-modal'
import { useCreateWorkspace } from '../api/use-create-workspace'

export const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal()

  const { mutate } = useCreateWorkspace()

  const handleCloseFunction = () => {
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleCloseFunction}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a workspace</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">
          <Input
            value=""
            disabled={false}
            required
            autoFocus
            minLength={3}
            placeholder="Workspace Name e.g. 'Work', 'Personal', 'Home' "
          />
          <div className=" flex justify-end">
            <Button disabled={false}>Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
