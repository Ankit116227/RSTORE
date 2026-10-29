import connectDB from "@/library/db";
import Address from "@/modal/address";

export async function GET() {
  try {
    await connectDB();

    const addresses = await Address.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return Response.json(addresses, {
      status: 200,
    });
  } catch (error) {
    console.error("ADDRESS GET ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      user,
      name,
      phone,
      addressLine,
      city,
      state,
      pincode,
      landmark,
      isDefault,
    } = body;

    if (
      !user ||
      !name ||
      !phone ||
      !addressLine ||
      !city ||
      !state ||
      !pincode
    ) {
      return Response.json(
        {
          success: false,
          message:
            "User, name, phone, address, city, state and pincode are required",
        },
        { status: 400 }
      );
    }

    const address = await Address.create({
      user,
      name,
      phone,
      addressLine,
      city,
      state,
      pincode,
      landmark: landmark || "",
      isDefault: isDefault ?? false,
    });

    return Response.json(
      {
        success: true,
        message: "Address created successfully",
        address,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ADDRESS POST ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}