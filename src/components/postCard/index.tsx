import { HeartIcon, MessageCircle } from 'lucide-react'
import { useContext, useState, type FC } from 'react'

// Utils
import { cn } from '@/lib/utils'

// Types
import type { DocumentResponse, LikesInfo } from '@/types'

// Services
import { updateLikesOnPost } from '@/repository/post.service'

// Context
import { userAuthContext } from '@/context/userAuthContext'

// Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

interface IPostcard {
  data: DocumentResponse
}

const Postcard: FC<IPostcard> = ({ data }) => {
  const { user } = useContext(userAuthContext)
  const [likesInfo, setLikesInfo] = useState<LikesInfo>({
    likes: data.likes,
    isLike: data.userLikes?.includes(user!.uid) ? true : false
  })

  const updateLike = async (isVal: boolean) => {
    setLikesInfo({
      likes: isVal ? likesInfo.likes! + 1 : likesInfo.likes! - 1,
      isLike: !likesInfo.isLike
    })
    if (isVal) {
      data.userLikes?.push(user!.uid)
    } else {
      data.userLikes?.splice(data.userLikes.indexOf(user!.uid), 1)
    }

    await updateLikesOnPost(
      data.id!,
      data.userLikes!,
      isVal ? likesInfo.likes! + 1 : likesInfo.likes! - 1
    )
  }

  return (
    <Card className='mb-6 rounded-xl border border-gray-800 bg-gray-900 shadow-lg transition-all duration-300 hover:shadow-xl'>
      <CardHeader className='flex flex-col p-4'>
        <CardTitle className='flex items-center text-center text-sm font-semibold text-white'>
          <span className='mr-2'>
            <img
              src={data.photoURL}
              className='h-12 w-12 rounded-full border-2 border-gradient-to-r from-purple-500 to-blue-500 object-cover'
            />
          </span>
          <span className='text-lg'>{data.userName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-2 p-0'>
        {data.photos?.map((photo, index) => (
          <img
            key={index}
            src={photo.cdnUrl || ''}
            className='rounded-lg transition-transform duration-300 hover:scale-105'
          />
        ))}
      </CardContent>
      <CardFooter className='flex flex-col p-4'>
        <div className='mb-3 flex w-full items-center justify-between'>
          <HeartIcon
            className={cn(
              'mr-3 h-7 w-7 cursor-pointer transition-all duration-200 hover:scale-110',
              likesInfo.isLike ? 'fill-red-500 text-red-500' : 'fill-none text-gray-400'
            )}
            onClick={() => updateLike(!likesInfo.isLike)}
          />
          <MessageCircle className='h-7 w-7 cursor-pointer text-gray-400 transition-all duration-200 hover:scale-110 hover:text-blue-400' />
        </div>
        <div className='w-full text-sm font-medium text-gray-300'>{likesInfo.likes} likes</div>
        <div className='w-full text-sm text-gray-400'>
          <span className='font-semibold text-white'>{data.userName}</span>: {data.caption}
        </div>
      </CardFooter>
    </Card>
  )
}

export default Postcard
