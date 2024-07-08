import { dbConnect } from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Banner from "@/lib/models/Banner";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();

    const { title, description, image } = await req.json();

    if (!title || !description || !image) {
      return new NextResponse("Fill in all fields.", { status: 400 });
    }

    const bannerExists = await Banner.findOne({ title });

    if (bannerExists) {
      return new NextResponse("Banner already exists.", { status: 400 });
    }

    const newBanner = await Banner.create({
      title,
      description,
      image,
    });

    await newBanner.save();

    return NextResponse.json(newBanner, { status: 200 });
  } catch (error) {
    console.log("banners_POST", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};
