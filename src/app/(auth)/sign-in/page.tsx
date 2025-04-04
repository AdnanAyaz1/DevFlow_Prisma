"use client";

import AuthFormsWrapper from "@/components/forms/auth-forms/AuthFormsWrapper";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/zod-validation-schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { routes } from "@/constants/routes";
import PasswordToggle from "../sign-up/components/PasswordToggle";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const defaultValues = { email: "", password: "" };

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const togglePasswordType = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (res?.error) {
      toast({
        title: "Sign In Failed",
        description: "Invalid Email or Password",
        variant: "destructive",
      });
    } else if (res?.ok) {
      toast({
        title: "Sign In Successful",
        description: "Welcome back!",
        variant: "success",
      });

      setTimeout(() => {
        router.push(routes.home);
      }, 500);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-auth-bg bg-no-repeat bg-center bg-cover dark:bg-auth-bg-dark flex-center">
      <AuthFormsWrapper type="Sign In">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-10 space-y-6"
          >
            {Object.keys(defaultValues).map((field) => {
              return (
                <FormField
                  key={field}
                  control={form.control}
                  name={field as Path<z.infer<typeof signInSchema>>}
                  render={({ field }) => {
                    return (
                      <FormItem className="flex w-full flex-col gap-2.5">
                        <FormLabel className="paragraph-medium  dark:text-light-700 text-dark-400">
                          {field.name === "email"
                            ? "Email Address"
                            : field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              required
                              type={
                                field.name === "password"
                                  ? showPassword
                                    ? "text"
                                    : "password"
                                  : "text"
                              }
                              {...field}
                              className="paragraph-regular border-0 bg-light-900 dark:bg-dark-300 light-border-2 text-dark-300 dark:text-light-700 no-focus min-h-12 rounded-1.5 "
                            />
                            {field.name === "password" && (
                              <PasswordToggle
                                togglePasswordType={togglePasswordType}
                                fieldName={field.name}
                              />
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              );
            })}
            <Link
              className="body-medium text-[#1DA1F2]"
              href={"/forgot-password"}
            >
              <p className="mt-[14px] text-right">Forgot Password ?</p>
            </Link>
            <Button
              variant={"ghost"}
              className="primary-gradient w-full h-[45px] paragraph-semibold text-white hover:text-white active:scale-95 duration-150 transition-all ease-in-out"
              type="submit"
              disabled={isLoading}
            >
              {isLoading && <ReloadIcon className="mr-2 size-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>
      </AuthFormsWrapper>
    </div>
  );
};

export default SignIn;
