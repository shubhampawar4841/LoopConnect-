import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/card';
import { useUserAuth } from '@/context/userAuthContext';
import { HeartIcon, ChatAlt2Icon, ShareIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import { DocumentResponse } from '@/types';
import image2 from '@/assets/images/image2.jpg';

interface IPostCardProps {
  data: DocumentResponse;
}

const FALLBACK_IMAGE = '/path/to/fallback-image.jpg';
const FALLBACK_AVATAR = '/path/to/fallback-avatar.jpg';

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();
  const [likesInfo, setLikesInfo] = useState({
    likes: data.likes,
    isLike: data.userlikes.includes(user?.uid ?? ''),
  });

  const updateLike = (isLiked: boolean) => {
    setLikesInfo((prevState) => ({
      likes: isLiked ? prevState.likes + 1 : prevState.likes - 1,
      isLike: isLiked,
    }));
  };

  return (
    <Card className="w-full max-w-md mx-auto mb-6 shadow-lg rounded-lg hover:shadow-2xl transition-shadow duration-300">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <img
            src={image2}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_AVATAR;
            }}
            className="w-10 h-10 rounded-full border-2"
            alt="User avatar"
          />
          <div>
            <p className="text-sm font-medium leading-none">{user ? user.displayName : 'Guest'}</p>
            <p className="text-sm text-muted-foreground">2 hours ago</p>
          </div>
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <p className="text-sm">{data.content}</p>
        {data.photos?.[0]?.cdnUrl && (
          <img
            src={data.photos[0]?.cdnUrl || FALLBACK_IMAGE}
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMAGE;
            }}
            alt="Post image"
            className="mt-3 rounded-lg object-cover w-full h-64"
          />
        )}
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex justify-between">
        <button
          className={`flex items-center space-x-1 ${likesInfo.isLike ? 'text-red-500' : ''}`}
          onClick={() => updateLike(!likesInfo.isLike)}
        >
          <HeartIcon className={`w-6 h-6 ${likesInfo.isLike ? 'fill-current' : ''}`} />
          <span>{likesInfo.likes}</span>
        </button>
        <button className="flex items-center space-x-1">
          <ChatAlt2Icon className="w-6 h-6" />
          <span>Comment</span>
        </button>
        <button className="flex items-center space-x-1">
          <ShareIcon className="w-6 h-6" />
          <span>Share</span>
        </button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
