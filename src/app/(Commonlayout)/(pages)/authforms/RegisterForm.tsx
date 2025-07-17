import { registerUser } from "@/app/services/AuthService"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/router"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"


const RegisterForm = ({className, ...props}: React.ComponentProps<"div">) => {


    const router = useRouter();

    const form = useForm();
    

    const {formState: {isSubmitting}} = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        try {
            const res = await registerUser(data);

            if (res?.success) {
                toast.success(res?.message);
                router.push("/login");
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
                  <FormField control={form.control} name="username" render={({field}) => (
                    <FormItem>
                      <FormLabel>Your Name</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} value={field.value || ""} placeholder="Username" />
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
                        { isSubmitting ? "Logging in..." : "Register" }
                    </Button>
                    <Button variant="outline" className="w-full" disabled={isSubmitting}>
                        Login with Google
                    </Button>
                </div>
              </div>
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default RegisterForm