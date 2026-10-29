import connectDB from "@/library/db";
import Offer from "@/modal/offer";

// GET all offers
export async function GET() {
  try {
    await connectDB();

    const offers = await Offer.find().sort({
      createdAt: -1,
    });

    return Response.json(offers, {
      status: 200,
    });
  } catch (error) {
    console.error("OFFER GET ERROR:", error);

    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

// POST new offer
export async function POST(request) {
  try {
    await connectDB();

    const {
      title,
      description,
      discount,
      couponCode,
      image,
      startDate,
      endDate,
      isActive,
    } = await request.json();

    if (!title || discount === undefined || !startDate || !endDate) {
      return Response.json(
        {
          message:
            "Title, discount, startDate and endDate are required",
        },
        {
          status: 400,
        }
      );
    }

    const offer = await Offer.create({
      title,
      description,
      discount,
      couponCode,
      image,
      startDate,
      endDate,
      isActive,
    });

    return Response.json(offer, {
      status: 201,
    });
  } catch (error) {
    console.error("OFFER POST ERROR:", error);

    return Response.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}