import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHeader, TableHead, TableRow } from "@/components/ui/table";
import { MakeOrderPayload } from "@/api/order/types";
import { CartItemType } from "@/api/stock/types";
import useCreateOrder from "@/api/order/queries";

interface CashoutDialogProps {
  cartItems: CartItemType[];
  totalAmount: number;
  isOpen: boolean;
  onClose: () => void;
  onClearCart: () => void;
  onConfirm: () => void;
}

const CashoutDialog: React.FC<CashoutDialogProps> = ({
  cartItems,
  totalAmount,
  isOpen,
  onClose,
  onClearCart,
  onConfirm,
}) => {
  const { mutate, isLoading } = useCreateOrder();

  const generateGUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };
  const transformCartItemsToOrder = (cartItems: CartItemType[]): MakeOrderPayload => {
    const orderDate = new Date().toISOString();
    const orderId = generateGUID();

    return {
      orderDtos: cartItems.map((item) => ({
        orderId,
        productId: item.productId,
        productName: item.productName,
        qty: item.quantity,
        totalAmount: item.totalPrice,
        orderDate,
      }))
    };
  };
  const handlePlaceOrder = () => {
    const orderPayload = transformCartItemsToOrder(cartItems);

    mutate(orderPayload, {
      onSuccess: (response) => {
        console.log( response);
        onClearCart();
        onClose();
      },
      onError: (error) => {
        console.error( error);
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="bg-[#cae9ff] p-6 rounded-lg shadow-md">
        <h1 className="text-center font-bold text-2xl mb-6 text-[#1d3461]">Cashier Page</h1>

        <Table className="w-full">
          <TableHeader className="text-lg">
            <TableRow>
              <TableHead className="w-[100px] text-[#1d3461]">Invoice</TableHead>
              <TableHead className="text-[#1d3461]">Product Name</TableHead>
              <TableHead className="text-[#1d3461]">Price</TableHead>
              <TableHead className="text-[#1d3461]">Quantity</TableHead>
              <TableHead className="text-[#1d3461]">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[#1d3461]">
            {cartItems.map((item, index) => (
              <TableRow key={item.productId}>
                <TableCell className="font-medium">INV{index + 1}</TableCell>
                <TableCell>{item.productName}</TableCell>
                <TableCell>${item.sellingPrice.toFixed(2)}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${(item.sellingPrice * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-6 flex justify-end font-bold text-xl text-[#1d3461]">
          <span>Total Amount: ${totalAmount.toFixed(2)}</span>
        </div>

        <div className="flex space-x-5 justify-center mt-4">
          <Button
            onClick={handlePlaceOrder}
            className="bg-[#1d3461] text-[#cae9ff] hover:bg-[#cae9ff] hover:text-[#1d3461]"
            disabled={isLoading || cartItems.length === 0}
          >
            {isLoading ? "Placing Order..." : "Cash-Out"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CashoutDialog;
