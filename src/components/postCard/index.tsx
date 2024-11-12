import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { useUserAuth } from '@/context/userAuthContext';
import { HeartIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import { DocumentResponse } from '@/types';
import image2 from '@/assets/images/image2.jpg';

interface IPostCardProps {
  data: DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();
  const [likesInfo, setLikesInfo] = React.useState({
    likes: data.likes,
    isLike: data.userlikes.includes(user?.uid ?? ''),
  });

  const updateLike = (isVal: boolean) => {
    setLikesInfo((prevState) => ({
      likes: isVal ? prevState.likes + 1 : prevState.likes - 1,
      isLike: isVal,
    }));
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-col p-3">
        <CardTitle className="text-sm text-center flex items-center justify-center">
          <span className="mr-2">
            <img
              src={image2}
              onError={(e) => {
                e.currentTarget.src = '/path/to/fallback-avatar.jpg'; // Add fallback avatar path
              }}
              className="w-10 h-10 rounded-full border-2"
              alt="User avatar"
            />
          </span>
          <span>{user ? user.displayName : 'Guest'}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <img
          src={data.photos && data.photos.length > 0 ? data.photos[0].cdnUrl : '/path/to/fallback-image.jpg'}
          onError={(e) => {
            e.currentTarget.src = '/path/to/fallback-image.jpg'; // Set a fallback image
          }}
          alt="Post Content"
          className="w-full object-cover"
        />
      </CardContent>

      <CardFooter className="flex flex-col p-3">
        <div className="flex justify-between w-full mb-3">
          <HeartIcon
            className={cn(
              'mr-3 cursor-pointer transition-colors duration-200',
              likesInfo.isLike ? 'fill-red-500' : 'fill-gray-400'
            )}
            onClick={() => updateLike(!likesInfo.isLike)}
            aria-label="Like button" // Add ARIA label for accessibility
          />
          <span>{likesInfo.likes} Likes</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
