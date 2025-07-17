"use client"

import { loginUser } from "@/app/services/AuthService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { loginSchema } from "./schemas/loginSchema"
import { useUser } from "@/app/context/UserContext"

const LoginForm = ({className, ...props}: React.ComponentProps<"div">) => {

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
            const res = await loginUser(data);

            if (res?.success) {
                toast.success(res?.message);
                await refreshUser();
                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/dashboard");
                }
            }
        } catch (error) {
            console.log(error);
        }
    }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
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
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="underline underline-offset-4">
                  Register
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm