import { createBrowserRouter } from 'react-router-dom'

//Components
import ProtectedRoutes from './components/protectedRoutes'

//Pages
import Error from '@/pages/error'
import Home from '@/pages/home'
import Login from '@/pages/login'
import MyPhotos from '@/pages/myphotos'
import NotFound from '@/pages/notfound'
import Post from '@/pages/post'
import Profile from '@/pages/profile'
import EditProfile from '@/pages/profile/EditProfile'
import SignUp from '@/pages/signup'

export const router = createBrowserRouter([
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <Error />
      },
      {
        path: '/post',
        element: <Post />,
        errorElement: <Error />
      },
      {
        path: '/profile',
        element: <Profile />,
        errorElement: <Error />
      },
      {
        path: '/edit-profile',
        element: <EditProfile />,
        errorElement: <Error />
      },
      {
        path: '/myphotos',
        element: <MyPhotos />,
        errorElement: <Error />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />
  },
  {
    path: '/signup',
    element: <SignUp />,
    errorElement: <Error />
  },
  {
    path: '*',
    element: <NotFound />,
    errorElement: <Error />
  }
])