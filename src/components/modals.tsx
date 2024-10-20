'use client'

import { CreateWorkspaceModal } from '@/features/workspaces/components/create-workspace-modal'
import { useEffect, useState } from 'react'

export const ModalsList = () => {
  //In order to prevent hydration errors.
  const [mount, setMount] = useState(false)

  useEffect(() => {
    setMount(true)
  }, [])

  if (!mount) return

  return (
    <>
      <CreateWorkspaceModal />
    </>
  )
}
