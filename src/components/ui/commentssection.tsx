import { useState } from 'react';

const CommentSection: FC<{ postId: string; comments: Comment[] }> = ({ postId, comments }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(userAuthContext);

  const handleAddComment = async () => {
    if (user && newComment.trim()) {
      const comment: Comment = {
        userId: user.uid,
        userName: user.displayName!,
        text: newComment,
        date: new Date(),
      };

      await addCommentToPost(postId, comment);
      setNewComment('');
      // Optionally, fetch updated comments to display
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-semibold">Comments</h4>
      <ul>
        {comments.map((comment, index) => (
          <li key={index} className="mb-2">
            <strong>{comment.userName}</strong>: {comment.text}
          </li>
        ))}
      </ul>
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleAddComment}
      >
        Comment
      </button>
    </div>
  );
};
