import { type FC } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

//Components
import { Icons } from '@/components/ui/icons'

//Utils
import { auth } from '@/utils/firebase'

const ProtectedRoutes: FC = () => {
  const [user, loading] = useAuthState(auth)
  const location = useLocation()

  if (loading) {
    return <Icons.spinner />
  }

  return user ? <Outlet /> : <Navigate to='/login' state={{ from: location }} />
}
export default ProtectedRoutes