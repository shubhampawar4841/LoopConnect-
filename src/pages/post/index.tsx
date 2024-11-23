import { useContext, useState, type FC } from 'react'
import { useNavigate } from 'react-router-dom'

//Context
import { userAuthContext } from '@/context/UserAuthContext'

//Types
import type { PhotoMeta, Post } from '@/types/index'
import type { OutputFileEntry } from '@uploadcare/react-uploader'

//Services
import { createPost } from '@/repository/post.service'

//Components
import FileUploader from '@/components/fileUploader'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const Post: FC = () => {
  const navigate = useNavigate()
  const { user } = useContext(userAuthContext)
  const [fileEntry, setFileEntry] = useState<OutputFileEntry[] | []>([])

  const [post, setPost] = useState<Post>({
    caption: '',
    photos: [],
    likes: 0,
    userLikes: [],
    userId: '',
    userName: '',
    photoURL: '',
    date: new Date()
  })

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({ ...post, caption: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const photoMeta: PhotoMeta[] = fileEntry.map((file: OutputFileEntry) => {
      return { cdnUrl: file.cdnUrl, uuid: file.uuid }
    })

    if (user != null) {
      const newPost: Post = {
        ...post,
        userId: user?.uid,
        userName: user.displayName!,
        photoURL: user.photoURL!,
        photos: photoMeta
      }
      await createPost(newPost)

      navigate('/')
    } else {
      navigate('/login')
    }
  }

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='max-w3xl w-full border'>
          <h3 className='bg-slate-800 p-2 text-center text-lg text-white'>
            Create Post
          </h3>

          <div className='p-8'>
            <div className='flex flex-col'>
              <div className='mb-4'>Photos</div>
              <FileUploader
                files={fileEntry}
                onChange={setFileEntry}
                preview={true}
              />
            </div>

            <form onSubmit={handleSubmit}>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='caption'>
                  Photo Caption
                </Label>
                <Textarea
                  className='mb-8'
                  id='caption'
                  placeholder='What&#39;s in your photo'
                  value={post.caption}
                  onChange={handleChange}
                />
                <Button className='w-32' type='submit'>
                  Post
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Post