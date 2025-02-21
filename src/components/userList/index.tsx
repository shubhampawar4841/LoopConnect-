
import { useContext, useEffect, useState, type FC } from 'react'

//Context
import { userAuthContext } from '@/context/userAuthContext'

//Services
import { getAllUsers } from '@/repository/userProfile.service'

//Assets
import avatar from '@/assets/images/avatar.png'

//Types
import { UserProfileResponse } from '@/types'
import { Link } from 'react-router-dom'
import UserRenderList from './UserRenderList'

const UserList: FC = () => {
  const { user } = useContext(userAuthContext)
  const [suggestedUser, setSuggestedUser] = useState<UserProfileResponse[]>([])

  const getSuggestedUsers = async (userId: string) => {
    const response = (await getAllUsers(userId)) || []
    setSuggestedUser(response)
  }

  useEffect(() => {
    if (user?.uid != null) {
      getSuggestedUsers(user.uid)
    }
  }, [])

  return (
    <div className='relative flex h-screen w-full max-w-10 flex-col overflow-hidden text-white sm:max-w-sm'>
      <Link to='/profile'>
        <div className='flex cursor-pointer items-center border-b border-gray-400 sm:p-4'>
          <span className='inline-flex sm:mr-2'>
            <img
              src={user?.photoURL ? user.photoURL : avatar}
              className='mb-2 h-10 w-10 rounded-full border-2 border-slate-800 object-cover sm:mb-0'
            />
          </span>
          <span className='hidden text-xs sm:inline-flex'>
            {user?.displayName ? user.displayName : 'Guest_user'}
          </span>
        </div>
      </Link>
      <h3 className='hidden p-2 text-sm text-slate-300 sm:inline-flex'>
        Suggested Friends
      </h3>
      <div className='my-4 sm:mx-4'>
        {suggestedUser.length > 0 ? (
          <UserRenderList data={suggestedUser} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
export default UserList
