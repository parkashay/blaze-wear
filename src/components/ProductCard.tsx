'use client'
import Link from "next/link";
import React from "react";
import ProductImage from "./ProductImage";
import { Product } from "@/app/product/[id]/page";
import ReactStars from "react-stars";

const ProductCard = (product: Product) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="h-96 flex flex-col p-5 rounded border-2 group hover:scale-105 transition-transform ease-in-out duration-200"
    >
      <div className="relative h-64 w-full">
        <ProductImage product={product} fill />
      </div>
      <div className="p-6 bg-white">
        <p className="font-semibold text-lg">{product.title}</p>
        <div className="mt-4 flex items-center justify-between space-x-2">
          <div>
            <p className="text-gray-500">Price</p>
            <p className="text-lg font-semibold">${product.price}</p>
          </div>
          {product?.rating?.rate && (
            <div className="flex items-center">
              <ReactStars
                size={20}
                half={true}
                value={product?.rating.rate}
                edit={false}
              />
              <p>({product?.rating.rate})</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
