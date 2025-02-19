import Layout from "@/components/layout";
import Stories from "@/components/stories";
import { Input } from "@/components/ui/input";
import { useUserAuth } from "@/context/userAuthContext";
import { getPost } from "@/repository/post.service";
import { DocumentResponse } from "@/types";
import { Search } from "lucide-react";
import * as React from "react";
import { RenderPosts } from "../profile/RenderPost"; // Kept as import
import PostCard from "@/components/postcard"; // Assuming this exists

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<DocumentResponse[]>([]);

  const getAllPost = async () => {
    try {
      const response: DocumentResponse[] = (await getPost()) || [];
      console.log("The response is:", response);
      setData(response);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  React.useEffect(() => {
    if (user) {
      getAllPost();
    }
  }, [user]); // Added user as dependency

  const renderPostItems = () => {
    return data.map((item) => <PostCard data={item} key={item.id} />);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        {/* Search Bar */}
        <div className="relative w-full max-w-md bg-gray-100 p-4 rounded-lg shadow-lg">
          <Input
            className="w-full border-2 border-gray-300 rounded-md pr-12"
            placeholder="Search..."
            type="search"
            name="search"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>

        {/* Stories Section */}
        <div className="mb-5 w-full">
          <h2 className="mb-5 text-lg font-semibold">Stories</h2>
          <Stories />
        </div>

        {/* Feed Section */}
        <div className="mb-5 w-full">
          <h2 className="mb-5 text-lg font-semibold">Feed</h2>
          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.length > 0 ? renderPostItems() : <div>No Post Found</div>}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
