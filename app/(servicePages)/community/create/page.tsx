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
import { Textarea } from "@/components/ui/textarea"
import { UploadButton } from "@/lib/uploadthing"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  postTitle: z.string(),
  postDescription: z.string(),
})

const CreatePost = () => {
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postTitle: "",
      postDescription: "",
    },
  })
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log("Image: ", imageUrl)
    try {
      const res = await fetch("/api/community", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          postImage: imageUrl
        })
      });
      if (!res.ok) {
        setError("Error in posting the product (Fill out all the fields)");
      }
      const data = await res.json();
      console.log(data);
      setTimeout(() => {
        if (error) {
          router.replace(`/community`)
        } else {
          router.refresh();
        }
      }, 1500);
    } catch (error: any) {
      console.log(error)
    }
  }

  return (
    <div className="w-full flex flex-col items-center mt-10">
      <h2 className="text-xl md:text-4xl text-purple-500 font-bold text-center mb-6">Create a post</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full max-w-5xl">
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
            name="postTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input placeholder="Post Title here.." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="postDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea className="h-52" placeholder="Type your content here..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {
            uploadError && <p className="text-sm mt-1 text-red-500">Error in uploading</p>
          }
          <div className="flex justify-center mt-4">
            <button disabled={imageUploading} type="submit" className="bg-purple-500 text-white w-96 py-2 rounded-md shadow-md hover:bg-purple-400 hover:shadow-lg text-sm">Create Post</button>
          </div>
          {
            error && <p className="text-sm mt-1 text-red-500">{error}</p>
          }
        </form>
      </Form>
    </div>
  )
}

export default CreatePost;
