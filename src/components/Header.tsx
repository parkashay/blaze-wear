"use client";
import { openCart } from "@/redux/slices/cartOpenSlice";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const { totalQuantity } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <header className="sticky top-0 bg-white z-10 shadow">
      <div className="container mx-auto p-6 flex justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          BlazeWear
        </Link>
        <div className="flex items-center justify-center gap-8">
          <Link href="/search">
            <BsSearch className="h-7 w-7 ml-5" />
          </Link>
          <button
            onClick={() => dispatch(openCart())}
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
          >
            <div className="relative">
              <AiOutlineShoppingCart className="w-7 h-7 flex-shrink-0" />
            </div>
            <span
              className={
                totalQuantity > 0
                  ? "text-sm bg-accent rounded-full px-2"
                  : "hidden"
              }
            >
              <span className="text-sm text-white font-bold">
                {totalQuantity}
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
