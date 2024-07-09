import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import Banner from "@/lib/models/Banner";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();

    const {
      title,
      description,
      media,
      category,
      banners,
      tags,
      sizes,
      colors,
      price,
    } = await req.json();

    if (!title || !description || !media || !category || !price) {
      return new NextResponse("Fill in all fields.", { status: 400 });
    }

    const newProduct = await Product.create({
      title,
      description,
      media,
      category,
      banners,
      tags,
      sizes,
      colors,
      price,
    });

    await newProduct.save();

    if (banners) {
      for (const bannerId of banners) {
        const banner = await Banner.findById(bannerId);
        if (banner) {
          banner.products.push(newProduct._id);
          await banner.save();
        }
      }
    }
    return NextResponse.json(newProduct, { status: 200 });
  } catch (error) {
    console.log("products_POST", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await dbConnect();

    const products = await Product.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "banners", model: Banner });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.log("products_GET", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};
