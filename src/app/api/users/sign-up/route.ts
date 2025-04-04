import bcrypt from "bcryptjs";
import User from "@/models/user";
import dbConnect from "@/lib/database-connection";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const { name, email, password } = await request.json();
  try {
    await dbConnect();
    const existingUser = await User.findOne({ email, provider: "credentials" });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User email already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
    });
    await user.save();
    return NextResponse.json(
      { success: true, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
