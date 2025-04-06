"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { forgotPasswordAction } from "@/app/server-actions/forgotPassword";
import { toast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await forgotPasswordAction(email);
      console.log(response);
      if (response.success) {
        toast({
          title: "Email sent",
          description: "Please check your email for the reset password link",
          variant: "success",
        });
      } else {
        toast({
          title: "Error",
          description: response.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-auth-bg bg-no-repeat bg-center bg-cover dark:bg-auth-bg-dark flex-center px-4 py-8">
      <div
        className="w-full max-w-[520px] h-[381px]
      py-[40px] px-[32px] bg-dark-300/80 rounded-lg"
      >
        <div className="flex-between">
          <div className="space-y-2">
            <h1 className="h2-bold text-white">Forgot Password</h1>
            <p className="paragraph-regular text-light-400">
              No worries, we’ll send you reset instructions.
            </p>
          </div>
          <Image src="/icons/site-logo.png" alt="logo" width={50} height={50} />
        </div>
        <div className="mt-[40px]">
          <Label className="paragraph-medium text-light-700">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="py-[16px] px-[24px] rounded-lg bg-dark-400/80 mt-[14px] mb-[25px] min-h-12 border-0 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            className="w-full  primary-gradient text-light-900 min-h-12 paragraph-semibold"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Continue"}
          </Button>

          <Link href="/sign-in" className="w-fit">
            <p className="text-blue-400 text-center mt-4 body-regular">
              Back to Login
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
