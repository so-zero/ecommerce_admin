import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { FaMinus } from "react-icons/fa";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white hover:bg-red-600 transition"
              >
                <FaMinus />
              </Button>
            </div>
            <Image
              src={url}
              alt="banner"
              className="object-cover rounded-md"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="f0xghsj1" onUpload={onUpload}>
        {({ open }) => {
          return (
            <Button
              onClick={() => open()}
              className="border border-gray-200 text-gray-400 flex"
            >
              이미지 업로드
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};
