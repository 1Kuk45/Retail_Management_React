import axios from '@/configs/axios';
import { APIResponse } from '@/shared/types';
import { MakeOrderPayload,OrderType } from './types';

const baseUrl = '/Order';

const createOrderApi = async (payload: MakeOrderPayload): Promise<APIResponse<OrderType[]>> => {
  const response = await axios.post(`${baseUrl}/makeorder`, payload.orderDtos);
  return response.data;
};

export default { createOrderApi };
