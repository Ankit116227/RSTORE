import connectDB from "@/library/db";
import Order from "@/modal/order";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!id) {
      return Response.json(
        { message: "Order ID is required" },
        { status: 400 }
      );
    }

    const order = await Order.findById(id)
      .populate("user", "name email")
      .populate("items.product")
      .populate("address");

    if (!order) {
      return Response.json(
        { message: "Order not found" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        order,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("ORDER SUCCESS API ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}