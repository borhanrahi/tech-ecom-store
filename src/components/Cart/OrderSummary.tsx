import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { selectAppliedPromo } from "@/redux/features/promo-slice";

const OrderSummary = () => {
  const cartItems = useSelector((state: RootState) => state.cartReducer.items);
  const appliedPromo = useSelector(selectAppliedPromo);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.discountedPrice * item.quantity), 0
    );
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    const subtotal = calculateSubtotal();
    
    return appliedPromo.type === 'percentage' 
      ? (subtotal * appliedPromo.value) / 100 
      : Math.min(appliedPromo.value, subtotal);
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const finalTotal = Math.max(subtotal - discount, 0);

  return (
    <div className="bg-white shadow-1 rounded-[10px]">
      <div className="border-b border-gray-3 py-5 px-8">
        <h3 className="font-medium text-xl text-dark">Order Summary</h3>
      </div>

      <div className="p-8">
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-dark">Subtotal:</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          {appliedPromo && (
            <div className="flex justify-between text-green-600">
              <span>Discount ({appliedPromo.code}):</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}

          <div className="flex justify-between border-t pt-4">
            <span className="text-dark font-medium">Total:</span>
            <span className="font-medium text-lg text-blue">
              ${finalTotal.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
