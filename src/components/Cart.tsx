"use client";
import { Product } from "@/app/product/[id]/page";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { closeCart } from "@/redux/slices/cartOpenSlice";
import { addItemToCart, removeItemFromCart } from "@/redux/slices/cartSlice";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { MdClose, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

function Cart() {
  const { isOpen } = useSelector((state: RootState) => state.cartOpen);
  const { items } = useSelector((state: RootState) => state.cart);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { setItem, getItem } = useLocalStorage("cartItems");
  const cartRef = useRef<HTMLDivElement>(null)
  const router = useRouter();
  useEffect(() => {
    if (items.length === 0) {
      setCartItems([]);
      return;
    }
    const fetchProduct = async (id: number) => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product: Product = await res.json();
      setCartItems((prev) => [...prev, product]);
    };
    setCartItems([]);
    items?.forEach((item) => {
      fetchProduct(item.id);
    });
  }, [items]);

  useEffect(() => {
    setItem(cartItems);
  }, [cartItems]);

  useLayoutEffect(() => {
    const cart = getItem() || [];
    setCartItems(cart);
    cart?.forEach((item: Product) => {
      dispatch(addItemToCart(item.id));
    });
    const handleClickOutside = (e: MouseEvent) => {
      if(!cartRef) return
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        dispatch(closeCart());
      }
    }
    window.addEventListener("mousedown", handleClickOutside)
  }, []);

  const handleCheckout = () => {
    return router.push("/checkout");
  };

  const dispatch = useDispatch();
  return (
    <div
    ref={cartRef}
      style={{
        translate: isOpen ? "0%" : "100%",
        transition: "all",
        transitionDuration: "0.5s",
      }}
      className={`fixed right-0 top-0 z-50 bg-white border-2 w-full sm:w-1/2  lg:w-1/3 h-full`}
    >
      <div className="flex flex-col gap-3 px-3 py-3 lg:py-6 lg:px-6">
        <button
          onClick={() => dispatch(closeCart())}
          className="self-end lg:pr-6"
        >
          {" "}
          <MdClose size={30} className="" />{" "}
        </button>
        <p className="font-bold">Cart :</p>

        <div>
          {cartItems.length === 0 ? (
            <div>No Items in Cart. </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 items-center border-2 p-2"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={50}
                    height={50}
                  />
                  <div className="w-full">
                    <p>{item.title}</p>
                    <div className="flex justify-between items-center">
                      <p className="font-bold">
                        In Cart : {items.find((i) => i.id === item.id)?.count}{" "}
                      </p>
                      <button
                        onClick={() => dispatch(removeItemFromCart(item.id))}
                      >
                        {" "}
                        <MdDelete size={20} color="red" />{" "}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {
          cartItems.length > 0 && <div>
          <button
            onClick={handleCheckout}
            className="flex items-center  gap-3 justify-center bg-button hover:bg-accent text-white px-3 py-2 rounded-lg w-full"
          >
            {" "}
            CHECKOUT <FaArrowRight />
          </button>
        </div>
        }
      </div>
    </div>
  );
}

export default Cart;
