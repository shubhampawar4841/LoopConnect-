import { HeartIcon, MessageCircle } from 'lucide-react'
import { useContext, useState, type FC } from 'react'
import { cn } from '@/lib/utils'
import { updateLikesOnPost } from '@/repository/post.service'
import { userAuthContext } from '@/context/UserAuthContext'
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
  const [isLoading, setIsLoading] = useState(false)

  const updateLike = async (isVal: boolean) => {
    if (isLoading) return // Prevent multiple clicks
    setIsLoading(true)

    setLikesInfo({
      likes: isVal ? likesInfo.likes! + 1 : likesInfo.likes! - 1,
      isLike: !likesInfo.isLike
    })

    try {
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
    } catch (error) {
      console.error('Error updating likes:', error)
      // Optionally revert UI changes
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className='mb-6'>
      <CardHeader className='flex flex-col p-3'>
        <CardTitle className='flex items-center text-sm'>
          <img
            src={data.photoURL || '/default-profile.png'}
            className='mr-2 h-10 w-10 rounded-full border-2 border-slate-800 object-cover'
            alt='User profile'
          />
          <span>{data.userName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-2 p-0'>
        {data.photos?.map((photo, index) => (
          <img key={index} src={photo.cdnUrl || ''} alt='Post' loading='lazy' />
        ))}
      </CardContent>
      <CardFooter className='flex flex-col p-3'>
        <div className='mb-3 flex w-full justify-between'>
          <HeartIcon
            className={cn(
              'mr-3',
              'cursor-pointer',
              likesInfo.isLike ? 'fill-red-500' : 'fill-none'
            )}
            onClick={() => updateLike(!likesInfo.isLike)}
          />
          <MessageCircle className='cursor-pointer' />
        </div>
        <div className='w-full text-sm'>{likesInfo.likes} likes</div>
        <div className='w-full text-sm'>
          <span>{data.userName}</span>: {data.caption}
        </div>
      </CardFooter>
    </Card>
  )
}

export default Postcard
