import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import Product from "@/lib/models/Product";
import Banner from "@/lib/models/Banner";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await dbConnect();

    const product = await Product.findById(params.productId).populate({
      path: "banners",
      model: Banner,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "product not found" }),
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.log("product_GET", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    await dbConnect();

    const product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        {
          status: 404,
        }
      );
    }

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

    const addedBanners = banners.filter(
      (bannerId: string) => !product.banners.includes(bannerId)
    );
    const removedBanners = product.banners.filter(
      (bannerId: string) => !banners.includes(bannerId)
    );

    await Promise.all([
      ...addedBanners.map((bannerId: string) =>
        Banner.findByIdAndUpdate(bannerId, {
          $push: { products: product._id },
        })
      ),

      ...removedBanners.map((bannerId: string) =>
        Banner.findByIdAndUpdate(bannerId, {
          $pull: { products: product._id },
        })
      ),
    ]);

    const updateProduct = await Product.findByIdAndUpdate(
      product._id,
      {
        title,
        description,
        media,
        category,
        banners,
        tags,
        sizes,
        colors,
        price,
      },
      { new: true }
    ).populate({ path: "banners", model: Banner });

    await updateProduct.save();

    return NextResponse.json(updateProduct, { status: 200 });
  } catch (error) {
    console.log("banner_POST", error);
    return new NextResponse("Server Error", { status: 500 });
  }
};
