import connectDB from "@/library/db";
import User from "@/modal/user";

export async function POST(request) {
  try {
    await connectDB();

    const { email, Password } = await request.json();

    // Check required fields
    if (!email || !Password) {
      return Response.json(
        {
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      return Response.json(
        {
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Check password
    if (user.Password !== Password) {
      return Response.json(
        {
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // Login successful
    return Response.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role,
          isVerified: user.isVerified,
          profileImage: user.profileImage,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    return Response.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}