"use client"
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlog = async (blogId: string) => {
      setLoading(true);
      const res = await fetch(`/api/blog/${blogId}`);
      const data = await res.json();
      setBlog(data);
      console.log(data);
      setLoading(false);
    };
    fetchBlog(blogId as string);
  }, [blogId])
  if (loading || !blog) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-4xl font-bold text-teal-450">Loading...</p>
      </div>
    )
  }
  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                {blog.blogTitle}
              </h2>

              <p className="mt-4 text-gray-700">
                {blog.blogContent}
              </p>
              <hr className="my-5 border-gray-300" />
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap items-center gap-3">
                  <Image src={blog.user.image} alt='blog image' className="w-9 h-9 rounded-full" height={50} width={50} />
                  <p className="text-xs text-gray-600 font-semibold">{blog.user.name}</p>
                </div>
                <p className="text-xs text-gray-600">{blog.createdAt}</p>
              </div>
            </div>
          </div>

          <div>
            <Image
              src={blog.blogImage}
              height={800}
              width={1000}
              className="rounded"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogDetails