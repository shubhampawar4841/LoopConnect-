import { HeartIcon } from 'lucide-react'
import { useContext, useEffect, useState, type FC } from 'react'

//Context
import { userAuthContext } from '@/context/userAuthContext'

//Services
import { getPostByUserId } from '@/repository/post.service'

//Types
import type { DocumentResponse } from '@/types'

//Components
import Layout from '@/components/layout'

const MyPhotos: FC = () => {
  const { user } = useContext(userAuthContext)
  const [userData, setUserData] = useState<DocumentResponse[]>([])

  const fetchData = async (id: string) => {
    const res = await getPostByUserId(id)
    if (res) setUserData(res)
  }

  useEffect(() => {
    if (user != null) {
      fetchData(user.uid)
    }
  }, [])

  const renderPost = () => {
    return userData.map((item, index) => {
      return (
        <div key={index} className='relative'>
          <div className='group absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-transparent transition-all duration-200 hover:bg-slate-950 hover:bg-opacity-75'>
            <div className='flex h-full w-full flex-col items-center justify-center'>
              <HeartIcon className='hidden fill-white group-hover:block' />
              <div className='hidden text-white group-hover:block'>
                {item.likes} likes
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-y-2'>
            {item.photos?.map((photo, index) => (
              <img
                key={index}
                src={
                  photo.cdnUrl +
                    '/-/progressive/yes/-/scale_crop/300x300/center/' || ''
                }
              />
            ))}
          </div>
          <p>{item.caption}</p>
        </div>
      )
    })
  }

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='w-full max-w-3xl border'>
          <h3 className='bg-slate-800 p-2 text-center text-lg text-white'>
            My Photos
          </h3>
          <div className='p-8'>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3'>
              {userData ? renderPost() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default MyPhotos