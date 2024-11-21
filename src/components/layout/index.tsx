import type { FC } from 'react'

//Constants
import { navItems } from '@/constants/mockData'

//Components
import Sidebar from '@/components/sidebar'
import UserList from '@/components/userList'

interface ILayout {
  children: React.ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <div className='flex bg-white'>
      <div className='fixed left-0 top-0 z-40 flex h-screen gap-x-4 bg-gray-800 lg:w-60'>
        <Sidebar items={navItems} />
      </div>
      <div className='mx-[40px] flex-1 p-[5px] sm:ml-36 sm:mr-60 sm:p-2 lg:mx-60 lg:p-8'>
        {children}
      </div>
      <div className='fixed right-0 top-0 z-40 flex h-screen bg-gray-800 lg:w-60'>
        <UserList />
      </div>
    </div>
  )
}
export default Layout