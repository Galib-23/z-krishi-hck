"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UploadButton } from "@/lib/uploadthing"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Textarea } from "../ui/textarea"

const formSchema = z.object({
  blog_title: z.string(),
  blog_description: z.string()
})

const CreateBlog = () => {
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blog_title: "",
      blog_description: "",
    },
  })
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            ...values,
            blog_img: imageUrl
          }
        )
      });
      if (!res.ok) {
        setError("Error in posting the product (Fill out all the fields)");
      }
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        if (error) {
          router.refresh();
        } else {
          router.replace(`/learn?tab=blogs`);
          window.location.reload();
        }
      }, 20);
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-xl md:text-4xl text-teal-500 font-bold text-center mb-6">Write a blog</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {
            !imageUrl ? (
              <UploadButton
                endpoint="imageUploader"
                onUploadBegin={() => {
                  setImageUploading(true);
                }}
                onClientUploadComplete={(res: any) => {
                  console.log(res[0].url);
                  setImageUrl(res[0].url);
                  setImageUploading(false);
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                  setUploadError(error.message);
                  setImageUploading(false);
                }}
              />
            ) : (
              <div className="flex justify-center">
                <Image src={imageUrl} alt="image" width={300} height={300} />
              </div>
            )
          }
          <FormField
            control={form.control}
            name="blog_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Blog title here.." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="blog_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea className="h-56" placeholder="Type your description here..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {
            uploadError && <p className="text-sm mt-1 text-red-500">Error in uploading</p>
          }
          <button disabled={imageUploading} type="submit" className="bg-teal-500 text-white w-full py-2 rounded-md shadow-md hover:bg-teal-400 hover:shadow-lg text-sm">Submit</button>
          {
            error && <p className="text-sm mt-1 text-red-500">{error}</p>
          }
        </form>
      </Form>
    </div>
  )
}

export default CreateBlog;
