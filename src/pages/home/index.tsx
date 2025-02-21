import { Search } from 'lucide-react'
import { useContext, useEffect, useState, type FC } from 'react'

//Type
import { DocumentResponse } from '@/types'

//Context
import { userAuthContext } from '@/context/userAuthContext'

//Services
import { getPosts } from '@/repository/post.service'

//Components
import Layout from '@/components/layout'
import Postcard from '@/components/postcard'
import Stories from '@/components/stories'
import { Input } from '@/components/ui/input'

const Home: FC = () => {
  const { user } = useContext(userAuthContext)
  const [data, setData] = useState<DocumentResponse[]>([])

  const getAllPost = async () => {
    const res = await getPosts()
    if (res) setData(res)
  }

  useEffect(() => {
    if (user != null) {
      getAllPost()
    }
  }, [])

  const renderPosts = () => {
    return data.map((item) => {
      return <Postcard data={item} key={item.id} />
    })
  }

  return (
    <Layout>
      <div className='flex flex-col'>
        <div className='relative mb-6 w-full text-gray-600'>
          <Input
            className='h-10 rounded-sm border-2 border-gray-300 bg-white px-5 pr-8 text-base focus:outline-none'
            placeholder='search'
            type='search'
            name='search'
          />
          <button type='submit' className='absolute right-2.5 top-2.5'>
            <Search className='h-5 w-5 text-gray-400' />
          </button>
        </div>

        <div className='mb-5 overflow-y-auto'>
          <h2 className='mb-5'>Stories</h2>
          <Stories />
        </div>

        <div className='mb-5'>
          <h2 className='mb-5'>Feed</h2>
          <div className='flex w-full justify-center'>
            <div className='flex max-w-sm flex-col overflow-hidden rounded-sm'>
              {data ? renderPosts() : <div>...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default Home