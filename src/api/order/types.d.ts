export type MakeOrderPayload= {
  orderDtos: OrderType[]
}
  
  export type OrderType = {
    orderId: string;
    productId: string;
    productName: string;
    qty: number;
    totalAmount: number;
    orderDate: string;
  };
  
//   export type APIResponse<T> = {
//     message?: string;
//     status: string;
//     data: T;
//   };
  