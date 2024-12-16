import { Edit2Icon } from 'lucide-react';
import { useContext, useEffect, useState, type FC } from 'react';
import { useNavigate } from 'react-router-dom';

// Context
import { userAuthContext } from '@/context/userAuthContext';

// Types
import type { DocumentResponse, UserProfileResponse } from '@/types/index';

// Assets
import avatar from '@/assets/images/avatar.png';

// Services
import { getPostByUserId } from '@/repository/post.service';
import { getUserProfile } from '@/repository/userProfile.service';

// Components
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { RenderPosts } from './RenderPost';

const Profile: FC = () => {
  const navigate = useNavigate();
  const { user } = useContext(userAuthContext);
  const [userData, setUserData] = useState<DocumentResponse[]>([]);

  const initialUserInfo: UserProfileResponse = {
    id: '',
    userId: user?.uid,
    userBio: '',
    photoURL: user?.photoURL ? user.photoURL : '',
    displayName: user?.displayName ? user.displayName : 'Guest_user',
  };
  const [userInfo, setUserInfo] = useState<UserProfileResponse>(initialUserInfo);

  const editProfile = () => {
    navigate('/edit-profile', { state: userInfo });
  };

  const fetchData = async (id: string) => {
    const res = await getPostByUserId(id);
    if (res) setUserData(res);
  };

  const getUserProfileInfo = async (userId: string) => {
    const data: UserProfileResponse = (await getUserProfile(userId)) || {};
    if (data.displayName) {
      setUserInfo(data);
    }
  };

  useEffect(() => {
    if (user != null) {
      fetchData(user.uid);
      getUserProfileInfo(user.uid);
    }
  }, []);

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='w-full max-w-3xl rounded-lg border bg-white shadow-md'>
          <h3 className='rounded-t-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 text-center text-lg font-bold text-white'>
            Profile
          </h3>

          <div className='border-b px-4 py-8 lg:p-8'>
            <div className='flex flex-col items-center lg:flex-row lg:items-start'>
              <div className='mr-4'>
                <img
                  src={userInfo.photoURL ? userInfo.photoURL : avatar}
                  alt='avatar'
                  className='h-28 w-28 rounded-full border-4 border-purple-500 object-cover shadow-md'
                />
              </div>

              <div className='text-center lg:text-left'>
                <h2 className='text-xl font-bold text-gray-700'>
                  {userInfo.displayName ? userInfo.displayName : 'Guest_user'}
                </h2>
                <p className='text-sm text-gray-500'>{user?.email ? user.email : ''}</p>
                <p className='mt-2 text-sm text-gray-600'>
                  {userInfo.userBio ? userInfo.userBio : 'Please update your bio...'}
                </p>
              </div>
            </div>

            <div className='mt-6 text-center lg:text-left'>
              <Button
                onClick={editProfile}
                className='flex items-center justify-center gap-2 rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600'
              >
                <Edit2Icon className='h-4 w-4' />
                Edit Profile
              </Button>
            </div>
          </div>

          <div className='p-4 lg:p-8'>
            <h2 className='mb-5 text-lg font-semibold text-gray-700'>My Posts</h2>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {userData ? (
                RenderPosts({ data: userData })
              ) : (
                <div className='col-span-full text-center text-gray-500'>...Loading</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
