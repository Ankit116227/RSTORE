import connectDB from "@/library/db";
import User from "@/modal/user";
import Product from "@/modal/product";
import Address from "@/modal/address";
import Order from "@/modal/order";

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product")
      .populate("address")
      .sort({ createdAt: -1 });

    return Response.json(orders, { status: 200 });
  } catch (error) {
    console.error("ORDER GET ERROR:", error);

    return Response.json(
      { message: error.message },
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
      items,
      address,
      totalAmount,
      paymentMethod,
    } = body;

    if (!user || !items || items.length === 0 || !address) {
      return Response.json(
        {
          message: "User, items and address are required",
        },
        { status: 400 }
      );
    }

    if (totalAmount === undefined || totalAmount < 0) {
      return Response.json(
        {
          message: "Valid totalAmount is required",
        },
        { status: 400 }
      );
    }

    const order = await Order.create({
      user,
      items,
      address,
      totalAmount,
      paymentMethod: paymentMethod || "COD",
    });

    const populatedOrder = await Order.findById(order._id)
      .populate("user", "name email")
      .populate("items.product")
      .populate("address");

    return Response.json(populatedOrder, { status: 201 });
  } catch (error) {
    console.error("ORDER POST ERROR:", error);

    return Response.json(
      { message: error.message },
      { status: 500 }
    );
  }
}