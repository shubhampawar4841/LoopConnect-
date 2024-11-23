import type { FC } from 'react'

//Types
import { UserProfileResponse } from '@/types/index'

//Assets
import avatar from '@/assets/images/avatar.png'

//Components
import { Button } from '@/components/ui/button'

interface IUserRenderList {
  data: UserProfileResponse[]
}

const UserRenderList: FC<IUserRenderList> = ({ data }) => {
  return data.map((user) => {
    return (
      <div className='mb-4 flex flex-row items-center justify-start border-gray-400'>
        <span className='sm:mr-2'>
          <img
            src={user.photoURL ? user.photoURL : avatar}
            className='h-10 w-10 rounded-full border-2 border-slate-800 object-cover'
          />
        </span>
        <span className='hidden text-xs sm:inline-flex'>
          {user.displayName ? user.displayName : 'Guest_User'}
        </span>
        <Button className='hidden h-6 bg-slate-900 p-3 py-2 text-xs last-of-type:ml-auto sm:inline-flex'>
          Follow
        </Button>
      </div>
    )
  })
}
export default UserRenderList