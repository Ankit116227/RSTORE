
import connectDB from "@/library/db";
import User from "@/modal/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Read request data
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

    // 3. Validate required fields
    if (!name || !email || !phone || !password) {
      return Response.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return Response.json(
        {
          success: false,
          message: "Password must contain at least 6 characters.",
        },
        { status: 400 }
      );
    }

    // 4. Check whether the email is already registered
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

    // 5. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 6. Create user
    // IMPORTANT: User model uses Password with capital P.
    const user = await User.create({
      name,
      email,
      Password: hashedPassword,
      phone,
    });

    // 7. Return success response
    return Response.json(
      {
        success: true,
        message: "Account created successfully.",
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("REGISTER API ERROR:", error);

    // Handle duplicate email errors
    if (error?.code === 11000) {
      return Response.json(
        {
          success: false,
          message: "This email is already registered.",
        },
        { status: 409 }
      );
    }

    // Log the error on the server; do not expose internal details.
    return Response.json(
      {
        success: false,
        message: "Registration failed. Please check the server terminal.",
      },
      { status: 500 }
    );
  }
}


export default User;