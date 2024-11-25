import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Blogs = () => {
  const [blogs, setBlogs] = useState<any>([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const res = await fetch(`/api/blog`, {
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          return;
        }
        const data = await res.json();
        setBlogs(data);
      } catch (error: any) {
        console.log(error.message);
      }
    };
      getBlogs();
  }, [])
  return (
    <div>
      <div className='flex flex-col gap-8'>
        {
          blogs?.map((blog: any) => (
            <div key={blog.id} className="overflow-hidden group border-b border-gray-300 p-4 shadow-md">
            <div>
              <span className="text-sm block text-gray-500 mb-2">{blog.createdAt}</span>
              <h3 className="text-xl font-bold text-gray-800 transition-all">{blog.blogTitle}</h3>
              <div className="mt-4">
                <p className="text-gray-500 text-sm max-w-2xl">{blog.blogContent.substring(0, 160)}...<Link href={`/blog/${blog.id}`} className='text-blue-700 font-semibold cursor-pointer'>read more</Link></p>
              </div>
            </div>
            <hr className="my-5 border-gray-300" />
            <div className="flex flex-wrap items-center gap-3">
              <Image src={blog.user.image} alt='blog image' className="w-9 h-9 rounded-full" height={50} width={50} />
              <p className="text-xs text-gray-500 font-semibold">{blog.user.name}</p>
            </div>
          </div>
          ))
        }
      </div>
    </div>
  )
}

export default Blogs