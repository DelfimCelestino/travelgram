"use client";

import { useState } from "react";

type PostContentProps = {
  travelerName: string;
  post: {
    description: string;
  };
};

export default function PostContent({ travelerName, post }: PostContentProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  return (
    <div className="flex-1 flex flex-col ml-4">
      <h2 className="text-2xl font-bold mb-4">{travelerName}&apos;s Post</h2>
      <p className="mb-4">{post.description}</p>
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      <div className="flex-1 overflow-y-auto mb-4">
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div key={index} className="border-b py-2">
              {c}
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
      <form onSubmit={handleCommentSubmit} className="flex">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg p-2 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
