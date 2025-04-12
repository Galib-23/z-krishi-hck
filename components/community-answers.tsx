"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  answerContent: z.string(),
})

const CommunityAnswers = ({ post }: any) => {
  const [answers, setAnswers] = useState<any>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const response = await fetch(`/api/answers?postId=${post.id}`, {
          method: 'GET',
        });

        if (!response.ok) {
          Swal.fire("Error in getting answers");
        }
        const data = await response.json();
        setAnswers(data.answers);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAnswers();
  }, [post.id]);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      answerContent: "",
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      const res = await fetch('/api/answers', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          communityPostId: post.id,
        })
      });
      if (!res.ok) {
        Swal.fire("Error in posting")
      } else {
        const data = await res.json();
        setAnswers((prevData: any) => {
          return [data, ...prevData]
        })
        console.log(data);
        router.refresh();
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
          <FormField
            control={form.control}
            name="answerContent"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className="" placeholder="Write an answer..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button size="sm" type="submit">Submit</Button>
        </form>
      </Form>
      <h2 className="text-xl font-semibold text-gray-800 mt-4">Top Answers:</h2>
      <div className="mt-5 flex flex-col gap-5">
        {
          answers?.map((answer: any) => (
            <div key={answer.id}>
              <div className="flex gap-4">
                <Image className="w-8 h-8 rounded-full" src={answer.user.image} alt="ans" width={50} height={50} />
                <div>
                  <p className="text-sm text-gray-800">{answer.answerContent}</p>
                  <p className="text-[10px] text-gray-700">{answer.createdAt}</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CommunityAnswers