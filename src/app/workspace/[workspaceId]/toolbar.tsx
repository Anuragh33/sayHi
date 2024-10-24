import { Button } from '@/components/ui/button'
import { Info, Search } from 'lucide-react'

const Toolbar = () => {
  return (
    <nav className="bg-[#481349] flex items-center justify-between h-10 p-1.5">
      Toolbar
      <div className="flex-1" />
      <div className="min-w-[280px] max-[642px] grow-[2] shrink">
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent-25 justify-start h-7 px-2 w-full"
        >
          <Search
            className="size-4 text-white mr-2
          "
          />
          <span className="text-white text-xs">Search Workspaces</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <Info className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  )
}

export default Toolbar
