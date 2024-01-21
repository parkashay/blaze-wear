"use client";
import { Product } from "@/app/product/[id]/page";
import React from "react";
import ProductImage from "./ProductImage";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/redux/slices/cartSlice";
import { MdArrowRight, MdArrowRightAlt, MdShoppingCart } from "react-icons/md";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

function ProductDetails(product: Product) {
  const dispatch = useDispatch();
  const handleAddToCart = (id: number) => {
    dispatch(addItemToCart(id));
  };
  const quantity = useSelector((state: RootState) => state.cart.totalQuantity);
  const router = useRouter();
  return (
    <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 mb-48 pb-10">
      <ProductImage product={product} />
      <div className="divide-y">
        <div className="space-y-2 pb-8">
          <h1 className="text-2xl md:text-4xl font-bold">{product.title}</h1>
          <h2 className="text-gray-500 font-bold text-xl md:text-3xl">
            ${product.price}
          </h2>
        </div>
        <div className="pt-8">
          <p className="text-xs md:text-sm">{product.description}</p>
        </div>

        <div className="mt-5 py-4">
          <button
            onClick={() => handleAddToCart(product.id)}
            className="flex gap-2 items-center border bg-button rounded-lg py-2 px-4 hover:bg-accent text-white"
          >
            <MdShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
        {quantity > 0 && (
          <div>
            <button
              onClick={() => router.push("/checkout")}
              className="flex items-center gap-2 my-3 py-2 px-4 rounded-lg border-2 text-black hover:bg-accent/30"
            >
              Proceed to Checkout <MdArrowRightAlt />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
