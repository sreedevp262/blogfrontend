import React from 'react';
import { URL } from '../url';
import { Link } from 'react-router-dom';

function HomePost({ post }) {
  return (
    <div className="p-4 border rounded-lg shadow-md">
      <div className="flex flex-col">
        {/* Image */}
        <div className="overflow-hidden">
          <img 
            className="object-cover w-full h-48 rounded-md" 
            src={URL + post?.photo} 
            alt={post?.title || "Post Image"}  
          />
        </div>

        {/* Content */}
        <div className="pl-3 mt-3">
          <h5 className="text-xl font-semibold">{post?.title}</h5>

          <div className="text-xs flex items-center gap-2 mt-2">
            <p className="font-medium text-gray-600">By {post?.username}</p>
          </div>

          {/* Description with Read More */}
          <div className="mt-2 text-gray-700">
            <p>
              {post?.desc?.slice(0, 75) + "... "}
              <Link to={`/posts/post/${post?._id}`} className="text-blue-500 font-medium">
                Read more
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePost;
