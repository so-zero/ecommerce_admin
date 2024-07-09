'use client'

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import Loading from '@/components/custom ui/Loading';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/custom ui/BasicTable';
import { Separator } from '@/components/ui/separator';
import { columns } from '@/components/products/ProductColumns';

export default function Products() {
      const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState<ProductType[]>([])

    const getProducts = async () => {
        try {
            setLoading(true)
            const res = await fetch('/api/products', {
                method: 'GET'
            })

            const data = await res.json()
            setProducts(data)
            setLoading(false)
        } catch (error) {
             console.log("Products_GET", error);
        }
    }

    useEffect(() => {
getProducts()
    }, [])

  if (loading) {
    return <Loading />;
  }

    return (
      <div className="p-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">Products</h1>
          <Button
            onClick={() => router.push("/products/newproduct")}
            className="bg-rose-200 transition hover:bg-rose-400"
          >
            <p>등록하기</p>
          </Button>
        </div>
        <Separator className="mt-5 mb-8 bg-gray-700" />
        <DataTable columns={columns} data={products} searchKey="title" />
      </div>
    );
}

