import { LogIn } from 'lucide-react'
import type { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'

//Utils
import { cn } from '@/lib/utils'

//Service
import { firebaseAuthRequests } from '@/repository/signIn.service'

//Components
import { buttonVariants } from '../ui/button'

//Types
import { NavItem } from '@/types'

interface ISidebar {
  items: NavItem[]
}

const Sidebar: FC<ISidebar> = ({ items }) => {
  const { pathname } = useLocation()

  return (
    <nav className='relative flex h-screen w-full max-w-10 flex-col overflow-hidden sm:max-w-sm'>
      <Link to='/' className='flex justify-center p-5'>
        <div className='hidden text-lg text-white sm:inline-flex'>
          PhotoGram
        </div>
      </Link>
      {items.map((item, i) => (
        <div
          key={i}
          className={cn(
            buttonVariants({ variant: 'link' }),
            'hover: flex justify-start rounded-none p-0 text-white transition hover:no-underline',
            pathname === item.link
              ? 'bg-white text-gray-800'
              : 'hover:bg-slate-900 hover:text-secondary'
          )}
        >
          <Link to={item.link} className='flex h-full flex-1 p-2'>
            <span>{item.icon({ className: 'w-5 h-5 mr-2' })}</span>
            <span className='hidden sm:inline-flex'>{item.name}</span>
          </Link>
        </div>
      ))}

      <div
        className={cn(
          buttonVariants({ variant: 'link' }),
          'hover: flex justify-start rounded-none p-0 text-white transition hover:no-underline',
          pathname === '/login'
            ? 'bg-white text-gray-800'
            : 'hover:bg-slate-900 hover:text-secondary'
        )}
      >
        <Link
          to='/login'
          className='flex h-full flex-1 p-2'
          onClick={firebaseAuthRequests.logOut}
        >
          <span>
            <LogIn className='mr-2 h-5 w-5' />
          </span>
          <span className='hidden sm:inline-flex'>Logout</span>
        </Link>
      </div>
    </nav>
  )
}
export default Sidebar