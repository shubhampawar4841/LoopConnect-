import { type FC } from 'react';
import { RouterProvider } from 'react-router-dom';

// Context
import { UserAuthProvider } from './context/UserAuthProvider';

// Routes
import { router } from '@/routes';

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 transition-colors duration-300">
      <UserAuthProvider>
        <RouterProvider router={router} />
      </UserAuthProvider>
    </div>
  );
};

export default App;
