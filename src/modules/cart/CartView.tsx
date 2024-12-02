import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store";
import { Button } from "@/components/ui/button";
import { clearCart, updateQuantity } from "@/store/features/cartSlice";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog"; // Import the dialog component
import CashoutDialog from "./chunks/CashoutDialog"; // Import the CashoutDialog component

const CartView = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  // State for dialog visibility
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Open dialog for order confirmation
  const handleOpenPlaceOrderDialog = () => {
    if (cartItems.length === 0) {
      alert("Cart is empty! Add items to your cart before placing the order.");
      return;
    }
    setDialogOpen(true);
  };

  // Handle clearing the cart
  const handleClearCart = () => {
    dispatch(clearCart());
    setDialogOpen(false); // Close dialog after clearing cart
  };

  // Handle increasing/decreasing item quantity
  const handleIncreaseQuantity = (productId: string) => {
    dispatch(updateQuantity({ productId, quantity: 1 }));
  };

  const handleDecreaseQuantity = (productId: string) => {
    dispatch(updateQuantity({ productId, quantity: -1 }));
  };

  // Calculate the total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  // Handle order confirmation (for example, process the payment or complete the order)
  const handleConfirmOrder = () => {
    // You can implement order confirmation logic here (e.g., call an API to place the order)
    alert("Order placed successfully!");
    setDialogOpen(false); // Close the dialog after confirming the order
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <div className="bg-[#cae9ff] shadow-lg rounded-lg overflow-hidden w-full max-w-5xl p-6">
        <h1 className="text-center font-bold text-2xl mb-6 text-[#1d3461]">Cart Page</h1>
        <Table className="w-full">
          <TableHeader className="text-lg">
            <TableRow>
              <TableHead className="text-[#1d3461]">Product Name</TableHead>
              <TableHead className="text-[#1d3461]">Price</TableHead>
              <TableHead className="text-[#1d3461]">Quantity</TableHead>
              <TableHead className="text-[#1d3461]">Amount</TableHead>
              <TableHead className="text-[#1d3461]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <TableRow key={item.productId}>
                  <TableCell>{item.productName}</TableCell>
                  <TableCell>${item.sellingPrice}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>${item.totalPrice}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        className="bg-[#1d3461] text-white hover:bg-[#cae9ff] hover:text-[#1d3461] border border-[#1d3461]"
                        onClick={() => handleIncreaseQuantity(item.productId)}
                      >
                        +
                      </Button>
                      <Button
                        className="bg-[#1d3461] text-white hover:bg-[#cae9ff] hover:text-[#1d3461] border border-[#1d3461]"
                        onClick={() => handleDecreaseQuantity(item.productId)}
                      >
                        -
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  Your cart is empty.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="mt-6 flex justify-end font-bold text-xl text-[#1d3461]">
          <span>Total: ${totalAmount}</span>
        </div>

        <div className="flex space-x-5 justify-center mt-4">
          <Button
            onClick={handleOpenPlaceOrderDialog}
            className="bg-[#1d3461] text-white hover:bg-[#cae9ff] hover:text-[#1d3461] border border-[#1d3461]"
            disabled={cartItems.length === 0}
          >
            Place Order
          </Button>
          <Button
            className="bg-[#1d3461] text-white hover:bg-[#cae9ff] hover:text-[#1d3461] border border-[#1d3461]"
            onClick={handleClearCart}
          >
            Clear All
          </Button>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <CashoutDialog
          cartItems={cartItems} // Pass the cart items as props
          totalAmount={totalAmount} // Pass the total amount
          isOpen={isDialogOpen} // Control dialog visibility
          onClose={() => setDialogOpen(false)} // Close the dialog on cancel
          onClearCart={handleClearCart} // Clear cart callback
          onConfirm={handleConfirmOrder} // Confirm order callback
        />
      </Dialog>
    </div>
  );
};

export default CartView;
