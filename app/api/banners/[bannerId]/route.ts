import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Banner from "@/lib/models/Banner";

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

    return new NextResponse("Banner is deleted successfully", { status: 200 });
  } catch (error) {
    console.log("banner_DELETE", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};
