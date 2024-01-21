"use client";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product } from "../product/[id]/page";
import Image from "next/image";
import { CiMoneyBill } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { BsArrowRightCircleFill } from "react-icons/bs";

const Page = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { getItem } = useLocalStorage("cartItems");
  const [totalPrice, setTotalPrice] = useState(0);
  const [userDetails, setUserDetails] = useState<{
    fullname: string;
    phone: string;
    address: string;
    postalcode: string;
  }>({ fullname: "", phone: "", address: "", postalcode: "" });

  const router = useRouter();

  const getItemCallback = useCallback(getItem, []);

  useEffect(() => {
    const items = getItemCallback();
    if (items.length === 0) return router.push("/");
    setCartItems(items);
  }, [getItemCallback]);

  useEffect(() => {
    setTotalPrice(cartItems.reduce((acc, item) => acc + item.price, 0));
  }, [cartItems]);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    },
    [setUserDetails]
  );
  const handleCheckout = (e: FormEvent) => {
    e.preventDefault();
    window.localStorage.setItem("userDetails", JSON.stringify(userDetails));
    return router.push("/checkout/payment");
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex flex-col py-6 gap-3 px-3 md:px-6">
        <h1 className="text-xl font-bold">Enter Details</h1>
        <form
          className="flex flex-col gap-6 px-6 py-6"
          onSubmit={handleCheckout}
        >
          <div className="flex flex-col">
            <label>Full Name</label>
            <input
              type="text"
              name="fullname"
              value={userDetails.fullname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Phone Number</label>
            <input
              type="text"
              name="phone"
              value={userDetails.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={userDetails.address}
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col">
            <label>Postal Code</label>
            <input
              type="text"
              name="postalcode"
              value={userDetails.postalcode}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="flex items-center gap-3 justify-center bg-primary text-white py-3 rounded-lg hover:bg-accent"
          >
            PROCEED <BsArrowRightCircleFill size={20} />{" "}
          </button>
        </form>
      </div>
      <div className="py-3 px-3 md:px-6">
        <h1 className="font-bold">Order Summary:</h1>
        <div className="flex flex-col gap-6 my-3">
          {cartItems?.map((item: Product) => (
            <div key={item.id} className="flex items-center gap-3">
              <Image src={item.image} alt="product" height={100} width={100} />
              <div>
                <h1>{item.title}</h1>
                <h1>${item.price}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between px-6 font-bold border-2 bg-primary/80 text-white rounded-lg">
          {" "}
          <CiMoneyBill size={20} /> Total: ${totalPrice}
        </div>
      </div>
    </div>
  );
};

export default Page;
