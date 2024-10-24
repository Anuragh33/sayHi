import React from 'react'
import Toolbar from './toolbar'

interface workspaceIdLayoutProps {
  children: React.ReactNode
}

const workspaceIdLayout = ({ children }: workspaceIdLayoutProps) => {
  return (
    <div className="h-full">
      <Toolbar />
      {children}
    </div>
  )
}

export default workspaceIdLayout
