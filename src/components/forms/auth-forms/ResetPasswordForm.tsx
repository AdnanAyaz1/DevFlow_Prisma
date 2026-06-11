"use client";

import PasswordToggle from "@/app/(auth)/sign-up/components/PasswordToggle";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { resetPasswordSchema } from "@/lib/zod-validation-schemas";
import { zodResolver } from "@hookform/resolvers/zod";

import { ReloadIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { Path, useForm } from "react-hook-form";
import { z } from "zod";
import { updatePassword } from "@/app/server-actions/updatePassword";
import { toast } from "@/hooks/use-toast";
import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    passwordField: false,
    confirmPasswordField: false,
  });

  const router = useRouter();
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

  const defaultValues = {
    password: "",
    confirmPassword: "",
  };

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
    setLoading(true);
    try {
      const response = await updatePassword(values.password, token);
      console.log(response);
      if (response.success) {
        toast({
          title: response.message,
          variant: "success",
        });
        router.push(routes.signIn);
      } else {
        toast({
          title: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {Object.keys(defaultValues).map((name) => (
          <FormField
            key={name}
            control={form.control}
            name={name as Path<z.infer<typeof resetPasswordSchema>>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-2.5">
                <FormLabel
                  className={`paragraph-medium ${form.formState.errors[field.name] ? "text-red-500" : "dark:text-light-700 text-dark-300"}`}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
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
                            : "password"
                      }
                      {...field}
                      className={`paragraph-regular bg-light-900 dark:bg-dark-300 text-dark-300 dark:text-light-700 no-focus min-h-12 rounded-1.5 border ${
                        form.formState.errors[field.name]
                          ? "border-red-500 focus-visible:ring-red-500"
                          : "border-light-700 dark:border-dark-400"
                      }`}
                    />

                    {field.name?.toLocaleLowerCase().includes("password") && (
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
          type="submit"
          className="primary-gradient w-full h-[45px] paragraph-semibold    text-white hover:text-white active:scale-95 duration-150 transition-all ease-in-out"
          disabled={loading || Object.keys(form.formState.errors).length > 0}
        >
          {loading ? (
            <ReloadIcon className="mr-2 size-4 animate-spin" />
          ) : (
            <span>Reset Password</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
