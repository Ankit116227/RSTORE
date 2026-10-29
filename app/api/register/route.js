
import connectDB from "@/library/db";
import User from "../../../modal/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // Step 1: Connect to MongoDB
    await connectDB();

    // Step 2: Read request body
    const body = await request.json();

    const name =
      typeof body.name === "string" ? body.name.trim() : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const phone =
      typeof body.phone === "string" ? body.phone.trim() : "";

    const password =
      typeof body.password === "string" ? body.password : "";

    // Step 3: Validate required fields
    if (!name || !email || !password || !phone) {
      return Response.json(
        {
          success: false,
          message: "Name, email, password and phone are required.",
        },
        { status: 400 }
      );
    }

    // Step 4: Validate password
    if (password.length < 6) {
      return Response.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    // Step 5: Check existing account
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    // Step 6: Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Step 7: Create user
    // IMPORTANT: The password field name must match your User model.
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });

    // Step 8: Return success response
    return Response.json(
      {
        success: true,
        message: "User registered successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Log the full error in the server terminal for debugging.
    console.error("REGISTER API ERROR:", error);

    return Response.json(
      {
        success: false,
        message:
          error?.name === "ValidationError"
            ? "Please check the registration details."
            : error?.code === 11000
              ? "An account with this email already exists."
              : "Registration failed. Please check the server terminal.",
      },
      { status: 500 }
    );
  }
}

