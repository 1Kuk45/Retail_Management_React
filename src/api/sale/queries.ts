import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { SalesFilterParams, SalesProduct } from "./types";
import { APIResponse } from "@/shared/types";
import salesService from "./services";

export const getAllSalesWithProducts = {
  useQuery: (opt?: UseQueryOptions<SalesProduct[], Error>) =>
    useQuery<SalesProduct[], Error>({
      queryKey: ["getAllSalesWithProducts"],
      queryFn: async () => {
        console.log("getAllSalesWithProducts");
        const response: APIResponse<SalesProduct[]> = await salesService.GetAllSaleWithProducts();
        return response.data;
      },
      ...opt,
    }),
};

export const getSalesWithDate = {
  useQuery: (
    params: SalesFilterParams,
    opt?: UseQueryOptions<SalesProduct[], Error>
  ) =>
    useQuery<SalesProduct[], Error>({
      queryKey: ["getSalesWithDate", params],
      queryFn: async () => {
        console.log("Fetching sales with date filter:", params);
        const sales = await salesService.GetSalesWithDate(params);
        return sales;
      },
      ...opt,
    }),
};


