import Image from "next/image";
import React from "react";
import TokenValidation from "./components/TokenValidation";
import ResetPasswordForm from "@/components/forms/auth-forms/ResetPasswordForm";

const ResetPassword = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) => {
  const { token } = await searchParams;

  return (
    <div className="min-h-screen bg-auth-bg bg-no-repeat bg-center bg-cover dark:bg-auth-bg-dark flex-center">
      {/* a seperate file is made to just validate the token becuase we cannot use toast in server components and also we cannot make the client component async to get the params */}
      <TokenValidation token={token} />
      <div
        className="w-full max-w-[520px] 
      py-[40px] px-[32px] bg-dark-300/80 rounded-lg"
      >
        <div className="flex-between mb-6">
          <div className="space-y-2">
            <h1 className="h2-bold text-white">Forgot Password</h1>
            <p className="paragraph-regular text-light-400">
              No worries, we’ll send you reset instructions.
            </p>
          </div>
          <Image src="/icons/site-logo.png" alt="logo" width={50} height={50} />
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPassword;
