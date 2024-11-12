import Layout from "@/components/layout";
import { useUserAuth } from "@/context/userAuthContext";
import { getPostByUserId } from "@/repository/post.service";
import { DocumentResponse, Post } from "@/types";
import { HeartIcon } from "lucide-react";
import * as React from "react";

const MyPhotos: React.FunctionComponent = () => {
  const { user } = useUserAuth();
  const [data, setData] = React.useState<DocumentResponse[]>([]);
  const [loading, setLoading] = React.useState(true); // Add loading state

  const getAllPost = async (id: string) => {
    setLoading(true); // Set loading to true on data fetch
    try {
      const querySnapshot = await getPostByUserId(id);
      const tempArr: DocumentResponse[] = [];
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Post;
          const responseObj: DocumentResponse = {
            id: doc.id,
            ...data,
          };
          tempArr.push(responseObj);
        });
        setData(tempArr);
      } else {
        console.log("No documents found");
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false); // Stop loading after fetching data
    }
  };

  React.useEffect(() => {
    if (user) {
      getAllPost(user.uid);
    }
  }, [user]);

  const renderPost = () => {
    return data.map((item) => (
      <div key={item.photos[0].uuid} className="relative">
        <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
          <div className="flex flex-col justify-center items-center w-full h-full">
            <HeartIcon className="hidden group-hover:block fill-white" />
            <div className="hidden group-hover:block text-white">
              {item.likes} likes
            </div>
          </div>
        </div>
        <img
          src={`${item.photos[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
          onError={(e) => {
            e.currentTarget.src = "/path/to/fallback-image.jpg"; // Optional fallback image
            console.error("Image failed to load:", item.photos[0].cdnUrl);
          }}
          alt="User uploaded content"
        />
      </div>
    ));
  };

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">
            My Photos
          </h3>
          <div className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {loading ? (
                <div>Loading...</div> // Show loading text while fetching data
              ) : data.length > 0 ? (
                renderPost()
              ) : (
                <div>No posts available.</div> // Show this if no posts are found
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MyPhotos;
