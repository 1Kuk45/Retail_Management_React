
export type StockType = {
    productId: string
    productName: string
    stockQty: number
    sellingPrice: number
    profitPerItem: number
  }
  export type CartItemType = {
    productId: string;
    productName: string;
    stockQty: number;
    sellingPrice: number;
    quantity: number; 
    totalPrice: number; 
  };
  export type AddStockType={
    productName: string
    stockQty: number
    sellingPrice: number
    profitPerItem: number
  }
  export type UpdateProductModel={
    productId: string
    productName: string
    stockQty: number
    sellingPrice: number
    profitPerItem: number
  }

  