'use client'
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../product/[id]/page";

const SearchItem = () => {

    const [search, setSearch] = useState('');
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const getproducts = async() => {
            const resource = await fetch("https://fakestoreapi.com/products");
            const products = await resource.json();
            setProducts(products);
        }
        getproducts();
    },[])

    

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-[600px] mx-auto">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="container flex items-center justify-center p-6"
        >
          <input
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            type="search"
            autoComplete="off"
            placeholder="Search products..."
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3
        py-2 text-sm ring-offset-background"
          />
        </form>
      </div>
      <main className="flex-grow bg-[#f7f7f7]">
        <h1 className="text-5xl font-bold text-center mt-12">Search Products:</h1>
        <div className="container xl:max-w-screen mx-auto py-12 px-6">
          <div className="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {products.map((product) => (
              <div key={product.id} >
                {product.title.toLowerCase().includes(search.toLowerCase()) && (
                  <ProductCard key={product.id} {...product} />
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchItem
