interface workspaceIdSpaceProps {
  params: {
    workspaceId: string
  }
}

export default function workspaceIdPage({ params }: workspaceIdSpaceProps) {
  return <div>ID: {params.workspaceId}</div>
}
