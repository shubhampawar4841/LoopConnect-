import { type FC } from 'react'
import { RouterProvider } from 'react-router-dom'

//Context
import { UserAuthProvider } from './context/UserAuthProvider'

//Routes
import { router } from '@/routes'

const App: FC = () => {
  return (
    <UserAuthProvider>
      <RouterProvider router={router} />
    </UserAuthProvider>
  )
}
export default App