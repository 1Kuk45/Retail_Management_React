import { APIResponse } from "@/shared/types";
import axios from "axios";
import { SalesFilterParams, SalesProduct } from "./types";
const baseUrl = "/SaleControllers"; 
const GetAllSaleWithProducts = async (): Promise<APIResponse<SalesProduct[]>> => {
  try {
    const response = await axios.get<APIResponse<SalesProduct[]>>(
      `${baseUrl}/GetAllSaleWithProducts`
    );
    return response.data; 
  } catch (error) {
    console.error("Error fetching sales data:", error);
    throw error; 
  }
};
const GetSalesWithDate = async (params: SalesFilterParams): Promise<SalesProduct[]> => {
  const response = await axios.get<APIResponse<SalesProduct[]>>(
    `${baseUrl}/GetAllSalesWithDate`,
    { params }
  );
  if (response.data.data) {
    return response.data.data;
  }
  throw new Error(response.data.message || "Failed to fetch sales data.");
};

export default {GetAllSaleWithProducts,GetSalesWithDate}
