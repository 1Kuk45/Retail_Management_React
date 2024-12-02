

export type SaleProfit ={
    totalProfit: number;
  }
  
  export type SalesProduct ={
    saleId: string;
    productId: string;
    productName: string;
    qtySold: number;
    sellingPrice: number;
    profitPerItem: number;
    saleDate: string;
    saleProfit: SaleProfit;
    totalRevenue: number;
  }
  export type SalesFilterParams = {
    startDate: string; 
    endDate: string; 
  };
  
  