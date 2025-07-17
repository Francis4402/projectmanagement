"use client"

import { registerUser } from "@/app/services/AuthService"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { reisterSchema } from "./schemas/registerSchema"
import { useRouter, useSearchParams } from "next/navigation"
import { useUser } from "@/app/context/UserContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import LoginForm from "./LoginForm"
import { useState } from "react"


const RegisterForm = () => {

  const [open, setOpen] = useState(false);

    const form = useForm({
      resolver: zodResolver(reisterSchema)
    });
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const { refreshUser } = useUser();

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await registerUser(data);

            if (res?.success) {
                toast.success(res?.message);
                await refreshUser();

                if (redirect) {
                  router.push(redirect);
                } else {
                  router.push("/dashboard");
                }
            } else {
              toast.error("Register failed");
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Register</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Register To Your Account</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <FormField control={form.control} name="username" render={({field}) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} value={field.value || ""} placeholder="name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid gap-3">
                  <FormField control={form.control} name="email" render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} value={field.value || ""} placeholder="email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <div className="grid gap-3">
                <FormField control={form.control} name="password" render={({field}) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} value={field.value || ""} placeholder="456123" />
                      </FormControl>
                      <FormMessage/>
                    </FormItem>
                  )} />
                </div>
                <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        { isSubmitting ? "submitting..." : "Register" }
                    </Button>
                    <Button variant="outline" className="w-full" disabled={isSubmitting}>
                        Login with Google
                    </Button>
                </div>
              </div>
              <div className="mt-4 text-sm flex justify-center items-center gap-2">
                Already have an account?{" "}
                  <LoginForm onOpenLogin={() => setOpen(false)} />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  )
}

export default RegisterForm