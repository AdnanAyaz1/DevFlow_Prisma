import bcrypt from "bcryptjs";
import User from "@/models/user";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  console.log("API hit", email, password);

  try {
    await dbConnect();
    const existingUser = await User.findOne({ email, provider: "credentials" });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: "Invalid Email" },
        { status: 400 }
      );
    }

    const isValid = await bcrypt.compare(password, existingUser.password);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Wrong Password" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: true, user: existingUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
