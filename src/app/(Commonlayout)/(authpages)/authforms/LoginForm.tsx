"use client"

import { loginUser } from "@/app/services/AuthService"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { loginSchema } from "./schemas/loginSchema"
import { useUser } from "@/app/context/UserContext"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import RegisterForm from "./RegisterForm"

const LoginForm = ({onOpenLogin}: {onOpenLogin?: () => void}) => {

    const form = useForm({
        resolver: zodResolver(loginSchema)
    });

    const {formState: {isSubmitting}} = form;

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirectPath");
    const { refreshUser } = useUser();
    
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
          const response = await loginUser(data);

          if (response.success) {
            toast.success("Login successful");
            await refreshUser();
            
            if (redirect) {
              router.push(redirect);
            } else {
              router.push("/dashboard");
            }
          } else {
            toast.error(response?.message);
          }
          
        } catch (error) {
          console.log(error);
        }
    }


  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} onClick={onOpenLogin}>Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Login To Your Account</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
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
                        { isSubmitting ? "Logging in..." : "Login" }
                    </Button>
                    <Button variant="outline" className="w-full" disabled={isSubmitting}>
                        Login with Google
                    </Button>
                </div>
              </div>
              <div className="mt-4 text-sm flex gap-2 items-center justify-center">
                Don&apos;t have an account?{" "}
                <RegisterForm />
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
  )
}

export default LoginForm