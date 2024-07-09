"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { RiDeleteBin2Fill } from "react-icons/ri";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";

interface DeleteProps {
  item: string;
  id: string;
}

const Delete: React.FC<DeleteProps> = ({ item, id }) => {
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      const itemType = item === "product" ? "products" : "banners";
      const res = await fetch(`/api/${itemType}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setLoading(false);
        window.location.href = `/${itemType}`;
        toast.success(`${itemType}가 삭제되었습니다.`);
      }
    } catch (error) {
      console.log("Banner&Product_DELETE", error);
      toast.error("Banner, Product 삭제에 오류가 생겼습니다.");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button>
          <RiDeleteBin2Fill
            size={20}
            className="hover:text-red-500 transition"
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white text-gray-600">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            정말 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription>
            이 작업은 취소할 수 없으며, 영구적으로 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소하기</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-red-500 text-white"
          >
            삭제하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
