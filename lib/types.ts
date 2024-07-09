type BannerType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  products: ProductType[];
};

type ProductType = {
  _id: string;
  title: string;
  description: string;
  media: [string];
  category: string;
  banners: [BannerType];
  tags: [string];
  sizes: [string];
  colors: [string];
  price: number;
};
