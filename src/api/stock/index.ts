import { useMutation, UseMutationOptions, useQuery, useQueryClient, UseQueryOptions } from "@tanstack/react-query";
import { AddStockType, StockType } from "./types";
import { APIResponse } from "@/shared/types";
import stockService from './services'
import axios from "axios";

// import mockGetAllProduct from "@/mocks/mockProducts";

export const getAllProduct = {
    useQuery: (opt?: UseQueryOptions<StockType[], Error>) =>
      useQuery<StockType[], Error>({
        queryKey: ["fetchProduct"],
        queryFn: async () => {
          console.log("fetchProduct");
          const response: APIResponse<StockType[]> =
            await stockService.getAllProduct();
          return response.data;
        },
        ...opt,
      }),
  };
  export const addNewProduct = {
    useMutation: (opt?: UseMutationOptions<APIResponse<AddStockType>, Error, AddStockType>) =>
      useMutation<APIResponse<AddStockType>, Error, AddStockType>({
        mutationFn: async (product: AddStockType) => {
          const response: APIResponse<AddStockType> = await stockService.addNewProduct(product);
          return response;  // Return the response containing the new product
        },
        ...opt,
      }),
  };

  // export const useUpdateProduct = () => {
  //   return useMutation(
  //     (data: { id: string; product: ProductDTO }) => updateProductById(data.id, data.product),
  //     {
  //       onSuccess: (data) => {
  //         console.log("Product updated successfully:", data);
  //       },
  //       onError: (error) => {
  //         console.error("Error updating product:", error);
  //       },
  //     }
  //   );
  // }
  export const useUpdateProduct = {
    useMutation: (opt?: UseMutationOptions<APIResponse<StockType>, Error, StockType>) =>
      useMutation<APIResponse<StockType>, Error, StockType>({
        mutationFn: async (product: StockType) => {
          const response: APIResponse<StockType> = await axios.put(`/Product/UpdateProduct/?id=${product.productId}`, product);
          return response;  // Return the response containing the updated product
        },
        onMutate: () => {
          // Optionally show a loader or perform other actions
        },
        onSuccess: async () => {
          const queryClient = useQueryClient();
          await queryClient.invalidateQueries(['allProducts']); // Invalidate queries after success
        },
        onError: (error: Error) => {
          console.error('Error updating product:', error);
        },
        onSettled: () => {
          // Optionally hide loader or perform other cleanup actions
        },
        ...opt, // Spread other options passed by the consumer
      }),
  };

  export const deleteProduct = {
    useMutation: (opt?: UseMutationOptions<APIResponse<StockType>, Error, string>) =>
      useMutation<APIResponse<StockType>, Error, string>({
        mutationFn: async (productId: string) => {
          const response: APIResponse<StockType> = await stockService.deleteProduct(productId);
          return response;
        },
        ...opt,
      }),
  }
  
  // export const getAllProduct = {
  //   useQuery: (opt?: UseQueryOptions<any, Error>) =>
  //     useQuery<any, Error>({
  //       queryKey: ["fetchProduct"],
  //       queryFn: mockGetAllProduct, // Use the mock API
  //       ...opt,
  //     }),
  // };
  export default addNewProduct;