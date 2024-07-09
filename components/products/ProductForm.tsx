"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import Loading from "../custom ui/Loading";
import TextBox from "../custom ui/TextBox";
import TextSelect from "../custom ui/TextSelect";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  media: z.array(z.string()),
  category: z.string(),
  banners: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  initialData?: ProductType | null; //Must have "?" to make it optional
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState<BannerType[]>([]);

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
      console.log("Banners_GET", error);
      toast.error("Product 등록에 오류가 생겼습니다.");
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          banners: initialData.banners.map((banner) => banner._id),
        }
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          banners: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0,
        },
  });

  const handleKeyPress = (
    e:
      | React.KeyboardEvent<HTMLInputElement>
      | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = initialData
        ? `/api/products/${initialData._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setLoading(false);
        toast.success(
          `제품이 ${initialData ? "수정되었습니다." : "등록되었습니다."}`
        );
        window.location.href = "/products";
        router.push("/products");
      }
    } catch (error) {
      console.log("ProductForm_POST", error);
      toast.error("제품 등록에 오류가 생겼습니다.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Product 수정하기</h1>
          <Delete id={initialData._id} />
        </div>
      ) : (
        <h1 className="text-xl font-bold">New Product 등록하기</h1>
      )}

      <Separator className="mt-5 mb-8 bg-gray-700" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="제품명을 입력해주세요."
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="제품의 상세 내용을 입력해주세요."
                    {...field}
                    onKeyDown={handleKeyPress}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="가격을 입력해주세요."
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="카테고리를 입력해주세요."
                      {...field}
                      onKeyDown={handleKeyPress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Colors</FormLabel>
                  <FormControl>
                    <TextBox
                      placeholder="색상을 입력해주세요."
                      value={field.value}
                      onChange={(color) =>
                        field.onChange([...field.value, color])
                      }
                      onRemove={(colorRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (color) => color !== colorRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sizes</FormLabel>
                  <FormControl>
                    <TextBox
                      placeholder="사이즈를 입력해주세요."
                      value={field.value}
                      onChange={(size) =>
                        field.onChange([...field.value, size])
                      }
                      onRemove={(sizeRemove) =>
                        field.onChange([
                          ...field.value.filter((size) => size !== sizeRemove),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TextBox
                      placeholder="태그를 입력해주세요."
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove={(tagRemove) =>
                        field.onChange([
                          ...field.value.filter((tag) => tag !== tagRemove),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="banners"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collections</FormLabel>
                  <FormControl>
                    <TextSelect
                      placeholder="배너를 선택해주세요."
                      banners={banners}
                      value={field.value}
                      onChange={(_id) => field.onChange([...field.value, _id])}
                      onRemove={(idRemove) =>
                        field.onChange([
                          ...field.value.filter(
                            (bannerId) => bannerId !== idRemove
                          ),
                        ])
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-10">
            <Button
              type="submit"
              className="bg-rose-200 transition hover:bg-rose-400"
            >
              등록하기
            </Button>
            <Button
              type="button"
              onClick={() => router.push("/banners")}
              className="bg-red-500 text-white transition hover:bg-red-600"
            >
              취소하기
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
