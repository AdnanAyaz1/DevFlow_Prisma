import { db } from "@/lib/primsadb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields",
        },
        { status: 400 }
      );
    }

    // Find the user with the reset token
    const user = await db.user.findUnique({
      where: {
        id: token,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired token",
        },
        { status: 400 }
      );
    }

    // Check if the token is expired
    if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token has expired",
        },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token
    await db.user.update({
      where: {
        id: token,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successful",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred",
      },
      { status: 500 }
    );
  }
}
