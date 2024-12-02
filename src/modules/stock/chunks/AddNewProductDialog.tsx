import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import  { addNewProduct }  from "@/api/stock/index";
import { v4 as uuidv4 } from "uuid";
import { AddStockType, StockType } from "@/api/stock/types";

const AddNewProduct: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [stockQty, setStockQty] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number>(0);
  const [profitPerItem, setProfitPerItem] = useState<number>(0);
  const [toastVisible, setToastVisible] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const { mutate, isSuccess, error } = addNewProduct.useMutation();

  const addProduct = async () => {
    const newProduct = {
      productName,
      stockQty,
      sellingPrice,
      profitPerItem,
    };

    try {
      await mutate(newProduct); 
      setToastMessage("Product added successfully!");
      setToastVisible(true);
    } catch (e) {
      setToastMessage("Failed to add product. Please try again later.");
      setToastVisible(true);
    }
  };

  useEffect(() => {
    if (toastVisible) {
      const timeout = setTimeout(() => {
        setToastVisible(false); 
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [toastVisible]);

  return (
    <Dialog>
      {toastVisible && (
        <div className="toast fixed inset-0 flex items-center justify-center bg-opacity-60 bg-black">
          <div className="bg-[#cae9ff] text-[#012a4a] px-4 py-2 rounded-lg shadow-md">
            {toastMessage}
          </div>
        </div>
      )}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#012a4a] text-[#cae9ff] flex flex-col items-end hover:bg-[#cae9ff] hover:text-[#012a4a]"
        >
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#e4f4ff] text-[#012a4a]">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center">Add New Product</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Product Name
            </Label>
            <Input
              id="name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="col-span-3"
              placeholder="Enter product name"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              value={stockQty}
              onChange={(e) => setStockQty(Number(e.target.value))}
              type="number"
              className="col-span-3"
              placeholder="Enter quantity"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price
            </Label>
            <Input
              id="price"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(Number(e.target.value))}
              type="number"
              className="col-span-3"
              placeholder="Enter price"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="profitPerItem" className="text-right">
              Profit Per Item
            </Label>
            <Input
              id="profitPerItem"
              value={profitPerItem}
              onChange={(e) => setProfitPerItem(Number(e.target.value))}
              type="number"
              className="col-span-3"
              placeholder="Enter profit per item"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-[#cae9ff] text-[#012a4a] hover:bg-[#cae9ff] hover:text-[#012a4a]"
            onClick={addProduct}
            disabled={isSuccess}
          >
            Save Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewProduct;
