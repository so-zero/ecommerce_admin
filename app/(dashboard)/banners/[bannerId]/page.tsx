"use client";

import { useEffect, useState } from "react";
import Loading from "@/components/custom ui/Loading";
import BannerForm from "@/components/banners/BannerForm";

export default function BannerDetails({
  params,
}: {
  params: { bannerId: string };
}) {
  const [loading, setLoading] = useState(false);
  const [bannerDetails, setBannerDetails] = useState<BannerType | null>(null);

  const getBannerDetails = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/banners/${params.bannerId}`, {
        method: "GET",
      });
      const data = await res.json();
      setBannerDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("Banner_GET", error);
    }
  };

  useEffect(() => {
    getBannerDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <BannerForm initialData={bannerDetails} />;
}
