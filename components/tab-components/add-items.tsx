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
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { UploadButton } from "@/lib/uploadthing"
import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  product_name: z.string().min(2, {
    message: "Product_name must be at least 2 characters.",
  }),
  product_type: z.string(),
  product_description: z.string(),
  product_price: z.string(),
  total_sold: z.string().optional(),
  product_rating: z.string().optional(),
  product_remaining: z.string(),
})

const AddItems = () => {
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      product_type: "",
      product_description: "",
      product_price: "",
      total_sold: "",
      product_rating: "",
      product_remaining: "",
    },
  })
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          {
            ...values,
            product_image: imageUrl
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
          router.replace(`/marketplace?tab=${values.product_type}`)
        }else {
          router.refresh();
        }
      }, 800);
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return (
    <div className="w-full">
      <h2 className="text-xl md:text-4xl text-teal-500 font-bold text-center mb-6">Add an item</h2>
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
            name="product_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product name</FormLabel>
                <FormControl>
                  <Input placeholder="Product name here.." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Type your description here..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Type</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-3/4">
                      <SelectValue placeholder="Select Product Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CROP">Crop</SelectItem>
                      <SelectItem value="FERTILIZER">Fertilizer</SelectItem>
                      <SelectItem value="UTILS">Utils</SelectItem>
                      <SelectItem value="SEED">Seed</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input placeholder="Give an integer value" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="product_remaining"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Remaining</FormLabel>
                <FormControl>
                  <Input placeholder="Give an integer value" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          {
            uploadError && <p className="text-sm mt-1 text-red-500">Error in uploading</p>
          }
          <button disabled={imageUploading} type="submit" className="bg-teal-500 text-white w-full py-2 rounded-md shadow-md hover:bg-teal-400 hover:shadow-lg text-sm">Add Item</button>
          {
            error && <p className="text-sm mt-1 text-red-500">{error}</p>
          }
        </form>
      </Form>
    </div>
  )
}

export default AddItems;
