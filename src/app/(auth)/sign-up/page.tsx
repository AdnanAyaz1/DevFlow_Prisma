"use client";

import AuthFormsWrapper from "@/components/forms/auth-forms/AuthFormsWrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { routes } from "@/constants/routes";
import { toast } from "@/hooks/use-toast";
import { signUpSchema } from "@/lib/zod-validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import UsernameCheck from "./components/UsernameCheck";
import PasswordToggle from "./components/PasswordToggle";

const SignUp = () => {
  const [loading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    passwordField: false,
    confirmPasswordField: false,
  });
  const togglePasswordType = (fieldName: string) => {
    if (fieldName.toLocaleLowerCase() === "password") {
      setShowPassword((pre) => ({
        ...pre,
        passwordField: !pre.passwordField,
      }));
    }
    if (fieldName.toLocaleLowerCase() === "confirmpassword") {
      setShowPassword((pre) => ({
        ...pre,
        confirmPasswordField: !pre.confirmPasswordField,
      }));
    }
  };

  const router = useRouter();
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
  });

  const handleSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/sign-up", data);
      if (res.data.success == true) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });

        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        });

        setTimeout(() => {
          router.push(routes.home);
        }, 500);
      } else {
        toast({
          title: "Error ",
          description: res.data.message,
          variant: "destructive",
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error ",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-auth-bg bg-no-repeat bg-center bg-cover dark:bg-auth-bg-dark flex-center  font-inter  px-4 py-8">
      <AuthFormsWrapper type="Sign Up">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="mt-10 space-y-6"
          >
            {Object.keys(defaultValues).map((name) => (
              <FormField
                key={name}
                control={form.control}
                name={name as Path<z.infer<typeof signUpSchema>>}
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col gap-2.5">
                    <FormLabel
                      className={`paragraph-medium ${form.formState.errors[field.name] ? "text-red-500" : "dark:text-light-700 text-dark-300"}`}
                    >
                      {name === "email"
                        ? "Email Address"
                        : name.charAt(0).toUpperCase() + name.slice(1)}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          required
                          type={
                            field.name === "password"
                              ? showPassword.passwordField
                                ? "text"
                                : "password"
                              : field.name === "confirmPassword"
                                ? showPassword.confirmPasswordField
                                  ? "text"
                                  : "password"
                                : "text"
                          }
                          {...field}
                          className={`paragraph-regular bg-light-900 dark:bg-dark-300 text-dark-300 dark:text-light-700 no-focus min-h-12 rounded-1.5 border ${
                            form.formState.errors[field.name]
                              ? "border-red-500 focus-visible:ring-red-500"
                              : "border-light-700 dark:border-dark-400"
                          }`}
                        />
                        {field.name === "username" ? (
                          <UsernameCheck form={form} />
                        ) : null}
                        {field.name
                          ?.toLocaleLowerCase()
                          .includes("password") && (
                          <PasswordToggle
                            togglePasswordType={togglePasswordType}
                            fieldName={field.name}
                          />
                        )}
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button
              variant={"ghost"}
              className="primary-gradient w-full h-[45px] paragraph-semibold    text-white hover:text-white active:scale-95 duration-150 transition-all ease-in-out"
              disabled={
                loading || Object.keys(form.formState.errors).length > 0
              }
            >
              {loading ? (
                <ReloadIcon className="mr-2 size-4 animate-spin" />
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </form>
        </Form>
      </AuthFormsWrapper>
    </div>
  );
};

export default SignUp;
