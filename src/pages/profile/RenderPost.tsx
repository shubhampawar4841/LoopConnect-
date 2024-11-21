import { HeartIcon } from 'lucide-react'
import { FC } from 'react'

//Types
import { DocumentResponse } from '@/types'

interface IRenderPosts {
  data: DocumentResponse[]
}

export const RenderPosts: FC<IRenderPosts> = ({ data }) => {
  return data.map((item, index) => {
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