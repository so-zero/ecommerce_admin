"use client";

import React, { useState } from "react";
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
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import Loading from "../custom ui/Loading";
import ImageUpload from "../custom ui/ImageUpload";

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(500).trim(),
  image: z.string(),
});

interface BannerFormProps {
  initialData?: BannerType | null; //Must have "?" to make it optional
}

const BannerForm: React.FC<BannerFormProps> = ({ initialData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: "",
          description: "",
          image: "",
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
        ? `/api/banners/${initialData._id}`
        : "/api/banners";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setLoading(false);
        toast.success(
          `Banner가 ${initialData ? "수정되었습니다." : "등록되었습니다."}`
        );
        window.location.href = "/banners";
        router.push("/banners");
      }
    } catch (error) {
      console.log("BannerForm_POST", error);
      toast.error("Banner 등록에 오류가 생겼습니다.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-10">
      {initialData ? (
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">New Collection Banner 수정하기</h1>
          <Delete id={initialData._id} item="banner" />
        </div>
      ) : (
        <h1 className="text-xl font-bold">New Collection Banner 등록하기</h1>
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
                    placeholder="제목을 입력해주세요."
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
                    placeholder="내용을 입력해주세요."
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default BannerForm;
