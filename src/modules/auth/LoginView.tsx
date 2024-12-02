import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { loginMutation } from "@/api/auth/queries";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

const formSchema = z.object({
  userName: z.string().min(1, "User name is required"),
  password: z.string().min(1, "Password is required"),
});

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const {userLogin}=useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
    shouldUnregister: true,
  });

  const { mutate: loginUser } = loginMutation.useMutation({
    onMutate: () => setIsLoading(true),
    onSuccess: (data) => {
      // Cookies.set("token", data.token);
      userLogin(data.token);
      const routeToRedirect = location.state?.from || "/";
      navigate("/", { replace: true });

      toast({
        title: `You logged in with the following username: ${form.getValues().userName}`,
        description: "Successful login",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error("Error during login:", error);

      toast({
        title: "Login failed!",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    loginUser(data);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="flex flex-col items-center p-5 w-full max-w-sm bg-[#cae9ff]">
        <div className="flex flex-auto items-center py-3 text-[#003566] font-semibold">
          <h1>Login Form</h1>
        </div>
        <div className="text-[#003566] font-semibold">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Username field */}
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl className="bg-white">
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl className="bg-white">
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="bg-[#003566] text-white hover:bg-[#cae9ff] hover:text-[#003566] border border-[#1d3461]"
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default LoginView;
