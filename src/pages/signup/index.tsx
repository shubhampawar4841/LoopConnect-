import { useState, type FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

//Utils
import { firebaseAuthRequests } from '@/repository/signIn.service'

//Assets
import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'

//Types
import { UserSignIn } from '@/types/index'

//Components
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialValue: UserSignIn = {
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUp: FC = () => {
  const [userInfo, setUserInfo] = useState<UserSignIn>(initialValue)

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      firebaseAuthRequests.signUp(userInfo.email, userInfo.password)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  const handleGoogleSignIn = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault()
    try {
      await firebaseAuthRequests.googleSignIn()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleGithubSignIn = async (e: React.SyntheticEvent<HTMLElement>) => {
    e.preventDefault()
    try {
      await firebaseAuthRequests.githubSignIn()
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='h-screen w-full bg-slate-800'>
      <div className='container mx-auto flex h-full p-6'>
        <div className='flex w-full items-center justify-center'>
          <div className='hidden w-2/3 p-6 lg:block'>
            <div className='grid grid-cols-2 gap-2'>
              <img
                className='aspect-auto h-auto w-2/3 place-self-end rounded-3xl'
                src={image2}
                alt='smileman'
              />
              <img
                className='aspect-auto h-auto w-2/4 rounded-3xl'
                src={image1}
                alt='jumpman'
              />
              <img
                className='aspect-auto h-auto w-2/4 place-self-end rounded-3xl'
                src={image4}
                alt='musicgirl'
              />
              <img
                className='aspect-auto h-auto w-2/3 rounded-3xl'
                src={image3}
                alt='laughkid'
              />
            </div>
          </div>

          <div className='max-w-sm rounded-xl border bg-card text-card-foreground shadow-sm'>
            <Card>
              <form onSubmit={handleSubmit}>
                <CardHeader className='space-y-1'>
                  <CardTitle className='text-2xl'>SignUp an account</CardTitle>
                  <CardDescription>
                    Enter your email below to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                  <div className='grid grid-cols-2 gap-6'>
                    <Button variant='outline' onClick={handleGithubSignIn}>
                      <Icons.gitHub className='mr-2 h-4 w-4' />
                      Github
                    </Button>
                    <Button variant='outline' onClick={handleGoogleSignIn}>
                      <Icons.google className='mr-2 h-4 w-4' />
                      Google
                    </Button>
                  </div>
                  <div className='relative'>
                    <div className='absolute inset-0 flex items-center'>
                      <span className='w-full border-t' />
                    </div>
                    <div className='relative flex justify-center text-xs uppercase'>
                      <span className='bg-background px-2 text-muted-foreground'>
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      value={userInfo.email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({ ...userInfo, email: e.target.value })
                      }
                      placeholder='m@example.com'
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      id='password'
                      type='password'
                      placeholder='Password'
                      value={userInfo.password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({ ...userInfo, password: e.target.value })
                      }
                    />
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='password'>Confirm password</Label>
                    <Input
                      id='confirmpassword'
                      type='password'
                      placeholder='Confirm password'
                      value={userInfo.confirmPassword}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setUserInfo({
                          ...userInfo,
                          confirmPassword: e.target.value
                        })
                      }
                    />
                  </div>
                </CardContent>
                <CardFooter className='flex flex-col'>
                  <Button className='w-full' type='submit'>
                    Sign Up
                  </Button>
                  <p className='mt-3 text-center text-sm'>
                    Already have an account ? <Link to='/login'>Login</Link>
                  </p>
                </CardFooter>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp