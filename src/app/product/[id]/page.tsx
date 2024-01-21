import ProductDetails from "@/components/ProductDetails";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { id: number };
}): Promise<Metadata> {
  const resource = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  );
  const product: Product = await resource.json();
  const image = product.image;
  const title = product.title;
  const description = product.description;
  return {
    title,
    description,
    openGraph: {
      images: [image],
    },
  };
}
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
