import { APIResponse } from "@/shared/types"
import axios from "@/configs/axios"
import { AddStockType, StockType } from "./types"

const baseUrl='/Product'

const getAllProduct = async (): Promise<APIResponse<StockType[]>> => {
    const response = await axios.get<APIResponse<StockType[]>>(
        `${baseUrl}/GetAllProduct`
    )

    return response.data
}
export const getProductById = async (productId: string): Promise<APIResponse<StockType>> => {
  const response = await axios.get<APIResponse<StockType>>(`${baseUrl}/GetProductById/${productId}`);
  return response.data;
};
const addNewProduct = async (product: AddStockType): Promise<APIResponse<AddStockType>> => {
  try {
    const response = await axios.post<APIResponse<AddStockType>>(`${baseUrl}/AddProduct`, product);
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
export const updateProductById = async (id: string, product: AddStockType): Promise<AddStockType | null> => {
  try {
    const response = await axios.put(`${baseUrl}/UpdateProduct/${id}`, product);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw new Error('Failed to update product.');
  }
};
const deleteProduct= async(productId: string): Promise<APIResponse<StockType>>=>{
  try {
    const response = await axios.delete<APIResponse<StockType>>(`${baseUrl}/DeleteProductByID/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}
  
export default { getAllProduct,addNewProduct,getProductById,deleteProduct }