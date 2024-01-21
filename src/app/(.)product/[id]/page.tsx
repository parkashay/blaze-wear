"use client";
import ProductImage from "@/components/ProductImage";
import { Dialog } from "@headlessui/react";
import { redirect, useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import ReactStars from "react-stars";
import { Bars } from "react-loader-spinner";
import { Product } from "@/app/product/[id]/page";
import { MdLink, MdShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addItemToCart } from "@/redux/slices/cartSlice";

const Modal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const id = useParams().id;
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const product: Product = await res.json();

      setProduct(product);
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = (id: number) => {
    dispatch(addItemToCart(id));
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        router.back();
      }}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-3xl rounded bg-white p-10">
          {loading ? (
            <div className="w-full h-full">
              <Bars width={30} height={46} color={"green"} />
            </div>
          ) : (
            <div className="flex gap-x-8 h-96">
              {product?.image && (
                <div className="relative w-72 h-full hidden md:inline">
                  <ProductImage product={product} fill />
                </div>
              )}

              <div className="flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold text-primary">{product?.title}</h4>
                  <p className="font-medium text-sm">${product?.price}</p>

                  <div className="flex items-center text-sm my-4">
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
                    <p className="text-blue-600 ml-2 hover:underline cursor-pointer text-xs">
                      See all {product?.rating?.count} reviews
                    </p>
                  </div>

                  <p className="line-clamp-5 text-sm">{product?.description}</p>
                </div>

                <div className="flex  items-center justify-center space-x-5 text-sm">
                  <button
                    onClick={() => handleAddToCart(product!.id)}
                    className="flex items-center gap-2 border bg-button rounded-lg py-1 px-4 hover:bg-accent text-white"
                  >
                    {" "}
                    <MdShoppingCart /> Add to Cart
                  </button>
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center gap-2 border border-primary rounded-lg py-1 px-4 hover:bg-accent hover:text-white"
                  >
                    <MdLink /> View full details
                  </button>
                </div>
              </div>
            </div>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default Modal;
