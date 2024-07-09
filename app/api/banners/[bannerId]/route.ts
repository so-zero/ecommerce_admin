import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Banner from "@/lib/models/Banner";
import Product from "@/lib/models/Product";

export const GET = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    await dbConnect();

    const banner = await Banner.findById(params.bannerId);

    if (!banner) {
      return new NextResponse(JSON.stringify({ message: "Banner not found" }), {
        status: 404,
      });
    }

    return NextResponse.json(banner, { status: 200 });
  } catch (error) {
    console.log("banner_GET", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();

    let banner = await Banner.findById(params.bannerId);

    if (!banner) {
      return new NextResponse(JSON.stringify({ message: "Banner not found" }), {
        status: 404,
      });
    }

    const { title, description, image } = await req.json();

    if (!title || !description || !image) {
      return new NextResponse("Fill in all fields.", { status: 400 });
    }

    banner = await Banner.findByIdAndUpdate(
      params.bannerId,
      { title, description, image },
      { new: true }
    );
    await banner.save();

    return NextResponse.json(banner, { status: 200 });
  } catch (error) {
    console.log("banner_POST", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { bannerId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();

    await Banner.findByIdAndDelete(params.bannerId);

    await Product.updateMany(
      { banners: params.bannerId },
      { $pull: { banners: params.bannerId } }
    );
    return new NextResponse("Banner is deleted successfully", { status: 200 });
  } catch (error) {
    console.log("banner_DELETE", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};
