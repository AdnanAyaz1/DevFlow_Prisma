"use server";

import nodemailer from "nodemailer";
import { handleActionError, serverActionResponse } from "@/lib/action-utils";
import bcrypt from "bcryptjs";
import { db } from "@/lib/primsadb";

export const forgotPasswordAction = async (email: string) => {
  try {
    if (!email) {
      return serverActionResponse("Email is required", false, 400);
    }

    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return serverActionResponse("User not found", false, 404);
    }

    //generate a reset password token using bycrypt
    const resetPasswordToken = user.id;

    await db.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken,
        resetPasswordExpires: new Date(Date.now() + 3600000), // 1 hour from now
      },
    });

    // send the reset password token to the user's email
    // aslo send the user id
    const resetPasswordUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reset-password?token=${resetPasswordToken}`;

    // SEND THE URL IN THE EMAIL
    const emailContent = `
    <p>Hello,</p>
    <p>You are receiving this email because you (or someone else) has requested a password reset for your account.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetPasswordUrl}">Reset Password</a>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: "DevFlow.io",
      to: email,
      subject: "Reset Password",
      html: emailContent,
    });

    return serverActionResponse("Password reset email sent", true, 200);
  } catch (error) {
    return handleActionError(error);
  }
};
