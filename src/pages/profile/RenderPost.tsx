import { HeartIcon } from 'lucide-react';
import { FC } from 'react';

// Types
import { DocumentResponse } from '@/types';

interface IRenderPosts {
  data: DocumentResponse[] | null | undefined;
}

export const RenderPosts: FC<IRenderPosts> = ({ data = [] }) => {
  if (!Array.isArray(data) || data.length === 0) {
    console.warn('Invalid or empty data:', data);
    return <p className="text-center text-gray-500">No posts available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, index) => (
        <div key={index} className="relative">
          {/* Overlay for likes */}
          <div className="group absolute inset-0 h-full w-full bg-transparent transition-all duration-200 hover:bg-slate-950 hover:bg-opacity-75">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <HeartIcon className="hidden fill-white group-hover:block" />
              <div className="hidden text-white group-hover:block">
                {item.likes || 0} likes
              </div>
            </div>
          </div>

          {/* Post Images */}
          <div className="flex flex-col gap-y-2">
            {item.photos && Array.isArray(item.photos) ? (
              item.photos.map((photo, idx) => (
                <img
                  key={idx}
                  src={
                    photo.cdnUrl
                      ? `${photo.cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`
                      : 'https://via.placeholder.com/300' // Fallback image
                  }
                  alt={`Post photo ${idx + 1}`}
                  className="object-cover w-full h-auto"
                />
              ))
            ) : (
              <p className="text-center text-gray-400">No photos available.</p>
            )}
          </div>

          {/* Caption */}
          <p className="mt-2 text-gray-700">{item.caption || 'No caption provided.'}</p>
        </div>
      ))}
    </div>
  );
};
