"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/custom ui/BasicTable";
import { columns } from "@/components/banners/BannerColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Loading from '@/components/custom ui/Loading';

export default function Banners() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);

  const getBanners = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/banners", {
        method: "GET",
      });

      const data = await res.json();
      setBanners(data);
      setLoading(false);
    } catch (error) {
      console.log("BannerForm_GET", error);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-10">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Banners</h1>
        <Button
          onClick={() => router.push("/banners/newcollection")}
          className="bg-rose-200 transition hover:bg-rose-400"
        >
          <p>등록하기</p>
        </Button>
      </div>
      <Separator className="mt-5 mb-8 bg-gray-700" />
      <DataTable columns={columns} data={banners} searchKey="title" />
    </div>
  );
}
