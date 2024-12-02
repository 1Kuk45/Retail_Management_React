import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateProduct } from "@/api/stock/index"; // Ensure this matches your API path
import { StockType, UpdateProductModel } from "@/api/stock/types";
import { useQueryClient } from "@tanstack/react-query";
import { hideLoader, openLoader } from "@/store/features/loaderSlice";
import { toast } from "@/hooks/use-toast";

interface UpdateProductDialogProps {
 item: StockType;
}

const UpdateProductDialog: React.FC<UpdateProductDialogProps> = ({ item }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [updateProduct, setUpdateProduct] = useState<UpdateProductModel>({
    productId: "",
    productName: "",
    sellingPrice: 0,
    stockQty: 0,
    profitPerItem: 0,
  });
  const queryClient = useQueryClient()
  const { mutate: updatePro } = useUpdateProduct.useMutation({
      onMutate: () => openLoader(),
      onSuccess: async () => {
        await queryClient.invalidateQueries({
          queryKey: ["getAllProductsWithPagination"],
        });
        toast({
          title: "Update Success",
          description: "Product updated successfully",
        });
      
        
        setTimeout(() => setOpenDialog(false), 100);
      },
      onError: (error: any) => {
        console.error("Error", error);
        toast({
          title: "Error",
          description: "Something went wrong during the update",
          variant: "destructive",
        });
      },
      onSettled: () => hideLoader(), // Turn off loader
    }
  );

  const openEditDialog = (product: UpdateProductModel) => {
    setUpdateProduct({
      productId: product.productId,
      productName: product.productName,
      sellingPrice: product.sellingPrice,
      stockQty: product.stockQty,
      profitPerItem: product.profitPerItem,
    });
    setOpenDialog(true);
  };

  const saveChanges = () => {
    updatePro(updateProduct);
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger  asChild>
         
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Make changes to the product. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {/* Hidden field for product ID */}
            <input type="hidden" value={updateProduct.productId} readOnly />

            {/* Product Name */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Product Name
              </Label>
              <Input
                id="name"
                value={updateProduct.productName}
                onChange={(e) =>
                  setUpdateProduct((prev) => ({ ...prev, productName: e.target.value }))
                }
                className="col-span-3"
              />
            </div>

            {/* Selling Price */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sellingPrice" className="text-right">
                Selling Price
              </Label>
              <Input
                id="sellingPrice"
                type="number"
                value={updateProduct.sellingPrice}
                onChange={(e) =>
                  setUpdateProduct((prev) => ({
                    ...prev,
                    sellingPrice: parseFloat(e.target.value) || 0,
                  }))
                }
                className="col-span-3"
              />
            </div>

            {/* Stock */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                id="stock"
                type="number"
                value={updateProduct.stockQty}
                onChange={(e) =>
                  setUpdateProduct((prev) => ({
                    ...prev,
                    stock: parseInt(e.target.value) || 0,
                  }))
                }
                className="col-span-3"
              />
            </div>

            {/* Profit Per Item */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profitPerItem" className="text-right">
                Profit Per Item
              </Label>
              <Input
                id="profitPerItem"
                type="number"
                value={updateProduct.profitPerItem}
                onChange={(e) =>
                  setUpdateProduct((prev) => ({
                    ...prev,
                    profitPerItem: parseFloat(e.target.value) || 0,
                  }))
                }
                className="col-span-3"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={saveChanges}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UpdateProductDialog;
