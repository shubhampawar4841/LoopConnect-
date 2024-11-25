import { HeartIcon, MessageCircle, Share2 } from 'lucide-react'
import { useContext, useState, type FC } from 'react'
import { cn } from '@/lib/utils'
import { updateLikesOnPost, addCommentToPost } from '@/repository/post.service'
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
  const [comments, setComments] = useState<Comment[]>(data.comments || [])
  const [newComment, setNewComment] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [showComments, setShowComments] = useState(false)

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
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddComment = async () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now().toString(),
      text: newComment,
      userName: user?.displayName,
      userId: user?.uid,
      date: new Date().toISOString()
    }

    setComments((prev) => [...prev, comment])
    setNewComment('')

    try {
      await addCommentToPost(data.id!, comment)
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const handleShare = () => {
    // Implement share functionality here
    console.log('Share button clicked')
  }

  return (
    <Card className="mb-6 overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
      <CardHeader className="flex flex-col p-4 bg-gradient-to-r from-black to-blue-600">
        <CardTitle className="flex items-center text-sm text-white">
          <img
            src={data.photoURL || '/default-profile.png'}
            className="mr-3 h-12 w-12 rounded-full border-2 border-white object-cover shadow-md"
            alt="User profile"
          />
          <span className="font-semibold">{data.userName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2 p-0">
        {data.photos?.map((photo, index) => (
          <img 
            key={index} 
            src={photo.cdnUrl || ''} 
            alt="Post" 
            loading="lazy"
            className="w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ))}
      </CardContent>
      <CardFooter className="flex flex-col p-4 bg-gray-50">
        <div className="mb-3 flex w-full justify-between">
          <div className="flex space-x-4">
            <HeartIcon
              className={cn(
                'h-6 w-6 transition-all duration-300',
                'cursor-pointer',
                likesInfo.isLike ? 'fill-red-500 text-red-500 scale-110' : 'fill-none text-gray-600 hover:text-red-500'
              )}
              onClick={() => updateLike(!likesInfo.isLike)}
            />
            <MessageCircle 
              className="h-6 w-6 cursor-pointer text-gray-600 transition-all duration-300 hover:text-blue-500"
              onClick={() => setShowComments(!showComments)}
            />
          </div>
          <Share2 
            className="h-6 w-6 cursor-pointer text-gray-600 transition-all duration-300 hover:text-green-500"
            onClick={handleShare}
          />
        </div>
        <div className="w-full text-sm font-semibold">{likesInfo.likes} likes</div>
        <div className="w-full text-sm mt-2">
          <span className="font-semibold">{data.userName}</span>: {data.caption}
        </div>

        {/* Render Comments */}
        {showComments && (
          <div className="mt-4 max-h-40 overflow-y-auto">
            {comments.map((comment) => (
              <div key={comment.id} className="mb-2 text-sm">
                <strong className="font-medium">{comment.userName}: </strong>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Add Comment Input */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            className="flex-1 rounded-l-md border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="rounded-r-md bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-sm text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={handleAddComment}
          >
            Post
          </button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default Postcard

