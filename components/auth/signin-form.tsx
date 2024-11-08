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
import { signIn, useSession } from "next-auth/react"
import { redirect, useRouter } from "next/navigation"

const formSchema = z.object({
  email: z.string().email(),
  password: z.string()
})
const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("values: ", values);
    await signIn("credentials", { ...values, redirect: true });
    router.refresh();
  }
  const { data: session } = useSession()
  if(session?.user) {
    redirect("/");
  }
  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Your Email here.." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Your Password here.." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <button type="submit" className="bg-green-800 text-white w-full py-2 rounded-md shadow-md hover:bg-green-700 hover:shadow-lg text-sm">Sign In</button>
        </form>
      </Form>
    </div>
  )
}

export default SignInForm