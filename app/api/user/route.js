import db from "@/lib/db";
import { hash } from "bcryptjs";
// import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Check if user email already Exists
    const userExist = await db.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return NextResponse.json(
        {
          message: "User Already exists",
          user: null,
        },
        { status: 409 } // Conflict status for duplicate email
      );
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const newUser = await db.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    console.log("User:", newUser);
    return NextResponse.json(newUser, { status: 201 }); // Created status for successful user creation
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 }); // Internal Server Error
  }
}
