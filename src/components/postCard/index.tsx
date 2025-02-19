import { useUserAuth } from "@/context/userAuthContext";
import { DocumentResponse } from "@/types";
import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

interface IPostCardProps {
  data: DocumentResponse;
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({ data }) => {
  const { user } = useUserAuth();

  return (
    <Card className="mb-3 p-4 shadow-lg rounded-lg border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">{data.title}</CardTitle>
        <span className="text-sm text-gray-500">{data.date}</span>
      </CardHeader>

      {data.image && (
        <img
          src={data.image}
          alt="Post Image"
          className="w-full h-40 object-cover rounded-md mt-2"
        />
      )}

      <CardContent>
        <p className="text-sm text-gray-700">{data.content}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
