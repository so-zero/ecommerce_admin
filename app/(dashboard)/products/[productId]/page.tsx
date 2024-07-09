"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/custom ui/Loading";
import ProductForm from "@/components/products/ProductForm";

export default function ProductDetails({
  params,
}: {
  params: { productId: string };
}) {
  const [loading, setLoading] = useState(false);
  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null
  );

  const getProductDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET",
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("Product_GET", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <ProductForm initialData={productDetails} />;
}
