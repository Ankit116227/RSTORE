import connectDB from "@/library/db";
import Product from "@/modal/product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({
      createdAt: -1,
    });

    return Response.json(products, {
      status: 200,
    });
  } catch (error) {
    console.error("PRODUCT GET ERROR:", error);

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

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      description,
      price,
      category,
      image,
      stock,
      isActive,
    } = body;

    if (!name || price === undefined) {
      return Response.json(
        {
          success: false,
          message: "Name and price are required",
        },
        {
          status: 400,
        }
      );
    }

    const product = await Product.create({
      name,
      description: description || "",
      price,
      category: category || "",
      image: image || "",
      stock: stock || 0,
      isActive: isActive ?? true,
    });

    return Response.json(
      {
        success: true,
        message: "Product created successfully",
        product,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("PRODUCT POST ERROR:", error);

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