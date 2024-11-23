import { HeartIcon, MessageCircle } from 'lucide-react'
import { useContext, useState, type FC } from 'react'

//Utils
import { cn } from '@/lib/utils'

//Types
import type { DocumentResponse, LikesInfo } from '@/types/index'

//Assets

//Services
import { updateLikesOnPost } from '@/repository/post.service'

//Context
import { userAuthContext } from '@/context/UserAuthContext'

//Components
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
    <Card className='mb-6'>
      <CardHeader className='flex flex-col p-3'>
        <CardTitle className='flex items-center justify-start text-center text-sm'>
          <span className='mr-2'>
            <img
              src={data.photoURL}
              className='h-10 w-10 rounded-full border-2 border-slate-800 object-cover'
            />
          </span>
          <span>{data.userName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className='flex flex-col gap-y-2 p-0'>
        {data.photos?.map((photo, index) => (
          <img key={index} src={photo.cdnUrl || ''} />
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
          <MessageCircle className='mr-3' />
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