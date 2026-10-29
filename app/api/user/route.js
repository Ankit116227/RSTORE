import connectDB from "@/library/db";
import User from "@/modal/user";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find();

    return Response.json(users, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const {
      name,
      email,
      phone,
      Password,
      address,
      profileImage,
      role,
    } = await request.json();

    const user = await User.create({
      name,
      email,
      phone,
      Password,
      address,
      profileImage,
      role,
    });

    return Response.json(user, { status: 201 });
  } catch (error) {
    console.error("USER POST ERROR:", error);

    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}