import connectDB from "@/library/db";
import Payment from "@/modal/payment";
import Order from "@/modal/order";


// GET all payments
export async function GET() {
  try {
    await connectDB();

    const payments = await Payment.find()
      .populate("order")
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    return Response.json(payments, {
      status: 200,
    });
  } catch (error) {
    console.error("PAYMENT GET ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}


// POST payment
export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      order,
      user,
      amount,
      paymentMethod,
      transactionId,
    } = body;

    if (!order || !user || amount === undefined) {
      return Response.json(
        {
          success: false,
          message: "Order, user and amount are required",
        },
        {
          status: 400,
        }
      );
    }

    const existingOrder = await Order.findById(order);

    if (!existingOrder) {
      return Response.json(
        {
          success: false,
          message: "Order not found",
        },
        {
          status: 404,
        }
      );
    }

    const payment = await Payment.create({
      order,
      user,
      amount,
      paymentMethod: paymentMethod || "COD",
      transactionId: transactionId || "",
      paymentStatus:
        paymentMethod === "COD" ? "pending" : "pending",
    });

    return Response.json(
      {
        success: true,
        message: "Payment created successfully",
        payment,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("PAYMENT POST ERROR:", error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}