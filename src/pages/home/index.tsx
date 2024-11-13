import Layout from "@/components/layout";
import * as React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useUserAuth } from "@/context/userAuthContext";
import { DocumentResponse } from "@/types";
import PostCard from "@/components/postCard";
import Stories from "@/components/stories";
import { getPosts } from "@/repository/post.service";

interface IHomeProps {}

const Home: React.FunctionComponent<IHomeProps> = () => {
  const {user}=useUserAuth();
  const [data,setData]=React.useState<DocumentResponse[]>([]);
  const getAllPost=async () => {
    const response:DocumentResponse[]=(await getPosts())
    console.log("ALl post are :", response)
    setData(response);
  };
  React.useEffect(() => {
    if(user != null) {
      getAllPost();
    }
  },[]);

  const renderPost = () => {
    return data.map((item) => {
      return <PostCard data={item} key={item.id} />
    });
  };
  return (
    <Layout>
      <div className="flex flex-col">
        <div className="relative mn-6 w-full text-gray-50 ">
          <Input 
          className="border-2 border-gra-300 h-10 rounded-sm text-base focus:outline-none "
          placeholder="search"
          type="search"
          name="search"
          />
          <button type="submit" className="absolute right-2.5 top-2.5">
            <Search className="w-5 h-5 text-gray-400"/>
          </button>
        </div>
        <div>
          <div className="mb-5 overflow-y-auto">
            <h2 className="mb-5">Stories</h2>
            <Stories/>
          </div>
          <div className="mb-5">
            <h2 className="mb-5">Feed</h2>
            <div className="w-full flex justify-center">
              <div className="flex flex-col max-w-sm rounded-sm">
                {data ? renderPost() : <div>...Loading</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
