import ProductCard from "@/components/ProductCard";
import { Product } from "./product/[id]/page";

export default async function Home() {
  const resource = await fetch("https://fakestoreapi.com/products");
  const products: Product[] = await resource.json();
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-[#f7f7f7]">
        <h1 className="text-5xl font-bold text-center mt-12">DEALS OF THE DAY</h1>
        <div className="container xl:max-w-screen mx-auto py-12 px-6">
          <div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
