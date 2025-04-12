"use client"
import { ArrowDown, ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const PostVotes = ({post}: any) => {
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const res = await fetch(`/api/vote?postId=${post.id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch vote counts');
        }
        const data = await res.json();
        setUpvotes(data.upvotes);
        setDownvotes(data.downvotes);
      } catch (error) {
        console.log(error);
        setError("Error in getting vote counts")
      }
    };
    fetchVoteCounts();
  }, [post.id]);
  console.log(upvotes, downvotes)

  const handleVote = async (voteType: string) => {
    try {
      const response = await fetch(`/api/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: post?.id,
          voteType,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit vote');

      const data = await response.json();

      if (voteType === 'UPVOTE') {
        setUpvotes(data.upvotes);
      } else if (voteType === 'DOWNVOTE') {
        setDownvotes(data.downvotes);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  }
  return (
    <div className="mt-4 flex items-center gap-6">
      <p className="flex items-center gap-1"><ArrowUp onClick={() => handleVote("UPVOTE")} className="cursor-pointer text-blue-700 hover:text-teal-600 hover:scale-110" size={25} /> {upvotes}</p>
      <p className="flex items-center gap-1"><ArrowDown onClick={() => handleVote("DOWNVOTE")} className="cursor-pointer text-gray-700 hover:text-red-600 hover:scale-110" size={25} /> {downvotes}</p>
      { error && <p>{error}</p>}
    </div>
  )
}

export default PostVotes