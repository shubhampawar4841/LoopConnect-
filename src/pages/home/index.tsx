import { Search } from 'lucide-react';
import { useContext, useEffect, useState, type FC } from 'react';

//Type
import { DocumentResponse } from '@/types';

//Context
import { userAuthContext } from '@/context/UserAuthContext';

//Services
import { getPosts } from '@/repository/post.service';

//Components
import Layout from '@/components/layout';
import Postcard from '@/components/postCard';
import Stories from '@/components/stories';
import { Input } from '@/components/ui/input';

const Home: FC = () => {
  const { user } = useContext(userAuthContext);
  const [data, setData] = useState<DocumentResponse[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false); // Dark mode state

  const getAllPost = async () => {
    const res = await getPosts();
    if (res) setData(res);
  };

  useEffect(() => {
    if (user != null) {
      getAllPost();
    }
  }, []);

  const renderPosts = () => {
    return data.map((item) => {
      return <Postcard data={item} key={item.id} />;
    });
  };

  // Toggle Dark Mode
  const toggleDarkMode = () => setIsDarkMode((prev) => !prev);

  return (
    <Layout>
      <div className={`flex flex-col md:px-8 ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
        {/* Toggle Dark Mode Button */}
        <div className="flex justify-end my-4">
          <button
            onClick={toggleDarkMode}
            className="px-4 py-2 rounded-md text-sm font-medium bg-purple-500 text-white hover:bg-purple-600 focus:outline-none"
          >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6 w-full">
          <Input
            className={`h-12 w-full rounded-full border ${isDarkMode ? 'border-gray-700 bg-gray-800 text-gray-300' : 'border-gray-300 bg-white text-gray-700'}  pr-14 shadow-sm focus:outline-none`}
            placeholder="Search for posts or users..."
            type="search"
            name="search"
          />
          <button
            type="submit"
            className={`absolute right-4 top-2.5 flex items-center justify-center h-7 w-7 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-purple-500 text-white'} hover:bg-purple-600 focus:ring-2 focus:ring-purple-300`}
          >
            <Search className="h-4 w-4" />
          </button>
        </div>

        {/* Stories Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Stories</h2>
          <div className={`rounded-lg p-4 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <Stories />
          </div>
        </div>

        {/* Feed Section */}
        <div>
          <h2 className="mb-4 text-lg font-semibold">Feed</h2>
          <div className="flex w-full justify-center">
            <div className="flex max-w-md flex-col ">
              {data ? renderPosts() : <div className="text-gray-500">...Loading</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
