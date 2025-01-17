import React from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { 
  updateCartItemQuantity, 
  removeItemFromCart, 
  selectTotalPrice 
} from "@/redux/features/cart-slice";

const OrderList = () => {
  const dispatch = useDispatch();
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useAppSelector(selectTotalPrice);

  const handleUpdateQuantity = (e: React.MouseEvent, id: number, quantity: number) => {
    e.preventDefault();
    if (quantity > 0) {
      dispatch(updateCartItemQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className="bg-white shadow-1 rounded-[10px]">
      <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
        <h3 className="font-medium text-xl text-dark">Your Order</h3>
      </div>

      <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
        {cartItems.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            Your cart is empty
          </div>
        ) : (
          <>
            {/* <!-- product items --> */}
            {cartItems.map((item) => (
              <div key={item.id} className="py-5 border-b border-gray-3">
                {/* Product Name and Remove Button Row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    {item.imgs && (
                      <div className="relative w-16 h-16">
                        <Image 
                          src={item.imgs.thumbnails[0]} 
                          alt={item.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    )}
                    <p className="text-dark font-medium">{item.title}</p>
                  </div>
                  <button
                    onClick={(e) => handleRemoveItem(e, item.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                    type="button"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Quantity and Price Row */}
                <div className="flex items-center justify-end gap-6">
                  <div className="flex items-center rounded-md border border-gray-3">
                    <button
                      onClick={(e) => handleUpdateQuantity(e, item.id, item.quantity - 1)}
                      className="flex items-center justify-center w-8 h-8 text-dark hover:text-blue"
                      aria-label="Decrease quantity"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={(e) => handleUpdateQuantity(e, item.id, item.quantity + 1)}
                      className="flex items-center justify-center w-8 h-8 text-dark hover:text-blue"
                      aria-label="Increase quantity"
                      type="button"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-dark text-right min-w-[80px] font-medium">
                    ${(item.discountedPrice * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {/* <!-- shipping fee --> */}
            <div className="flex items-center justify-between py-5 border-b border-gray-3">
              <div>
                <p className="text-dark">Shipping Fee</p>
              </div>
              <div>
                <p className="text-dark text-right">$15.00</p>
              </div>
            </div>

            {/* <!-- total --> */}
            <div className="flex items-center justify-between pt-5">
              <div>
                <p className="font-medium text-lg text-dark">Total</p>
              </div>
              <div>
                <p className="font-medium text-lg text-dark text-right">
                  ${(totalPrice + 15).toFixed(2)}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderList;
