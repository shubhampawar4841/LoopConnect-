import { useContext, useEffect, useState, type FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

//Context
import { userAuthContext } from '@/context/userAuthContext'

//Services
import { updateUserInfoOnPosts } from '@/repository/post.service'
import { firebaseAuthRequests } from '@/repository/signIn.service'
import {
  createUserProfile,
  updateUserProfile
} from '@/repository/userProfile.service'

//Assets
import avatar from '@/assets/images/avatar.png'

//Types
import type { ProfileInfo, UserProfile } from '@/types'
import type { OutputFileEntry } from '@uploadcare/react-uploader'

//Components
import FileUploader from '@/components/fileUploader'
import Layout from '@/components/layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const EditProfile: FC = () => {
  const { user } = useContext(userAuthContext)
  const navigate = useNavigate()
  const location = useLocation()
  const { id, userId, userBio, displayName, photoURL } = location.state
  const [data, setData] = useState<UserProfile>({
    userId,
    userBio,
    displayName,
    photoURL
  })

  const [fileEntry, setFileEntry] = useState<OutputFileEntry[] | []>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, displayName: e.target.value })
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({ ...data, userBio: e.target.value })
  }

  const updateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      if (id) {
        await updateUserProfile(id, data)
      } else {
        await createUserProfile(data)
      }
      navigate('/profile')
    } catch (err) {
      console.log(err)
    }

    const profileInfo: ProfileInfo = {
      user: user!,
      displayName: data.displayName,
      photoURL: data.photoURL
    }

    firebaseAuthRequests.updateProfileInfo(profileInfo)
    updateUserInfoOnPosts(profileInfo)
  }

  useEffect(() => {
    if (fileEntry.length > 0) {
      setData({
        ...data,
        photoURL: fileEntry[fileEntry.length - 1].cdnUrl || ''
      })
    }
  }, [fileEntry])

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className='max-w3xl w-full border'>
          <h3 className='bg-slate-800 p-2 text-center text-lg text-white'>
            Edit Profile
          </h3>

          <div className='p-8'>
            <div className='mb-4 flex flex-col border-b pb-4'>
              <div className='mb-4'>Profile Picture</div>
              <div className='mb-4'>
                {fileEntry.length > 0 ? (
                  <img
                    src={fileEntry[fileEntry.length - 1].cdnUrl!}
                    alt='avatar'
                    className='h-28 w-28 rounded-full border-2 border-slate-800 object-cover'
                  />
                ) : (
                  <img
                    src={data.photoURL ? data.photoURL : avatar}
                    alt='avatar'
                    className='h-28 w-28 rounded-full border-2 border-slate-800 object-cover'
                  />
                )}
              </div>
              <FileUploader
                files={fileEntry}
                onChange={setFileEntry}
                preview={false}
              />
            </div>
            <form onSubmit={updateProfile}>
              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='displayName'>
                  Display Name
                </Label>

                <Input
                  className='mb-8'
                  id='displayName'
                  placeholder='Enter your username'
                  value={data.displayName}
                  onChange={handleInputChange}
                />
              </div>

              <div className='flex flex-col'>
                <Label className='mb-4' htmlFor='userBio'>
                  Profile Bio
                </Label>
                <Textarea
                  className='mb-8'
                  id='userBio'
                  placeholder='What&#39;s in your photo'
                  value={data.userBio}
                  onChange={handleTextAreaChange}
                />
                <Button className='mr-8 mt-4 w-32' type='submit'>
                  Update
                </Button>
                <Button
                  variant='destructive'
                  className='mr-8 mt-4 w-32'
                  onClick={() => navigate('/profile')}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}
export default EditProfile