"use client";
import { getUser } from "@/app/server-actions/getUser";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const TokenValidation = ({ token }: { token: string }) => {
  const validateToken = async () => {
    const isValidToken = await getUser(token);
    if (isValidToken) {
      // check if the token is expired
      if (
        isValidToken.resetPasswordExpires &&
        isValidToken.resetPasswordExpires < new Date()
      ) {
        toast({
          title: "Token expired",
          description: "Please request a new password reset",
          variant: "destructive",
        });
        redirect("/forgot-password");
      }
    } else {
      toast({
        title: "Invalid token",
        description: "Please request a new password reset",
        variant: "destructive",
      });
      redirect("/forgot-password");
    }
  };
  useEffect(() => {
    // validate the token
    validateToken();
  }, []);
  return <div></div>;
};

export default TokenValidation;
