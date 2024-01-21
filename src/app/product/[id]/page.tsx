import ProductDetails from "@/components/ProductDetails";
import { notFound } from "next/navigation";

export type Product = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
  rating?: { rate: number; count: number };
};
const page = async ({ params: { id } }: { params: { id: number } }) => {
  try {
    const resource = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product: Product = await resource.json();
    return <ProductDetails {...product} />;
  } catch (error) {
    notFound();
  }
};

export default page;
