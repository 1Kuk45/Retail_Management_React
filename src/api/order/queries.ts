import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import orderServices from './services';
import { MakeOrderPayload, OrderType } from './types';
import { APIResponse } from '@/shared/types';

const useCreateOrder = (
  options?: UseMutationOptions<APIResponse<OrderType[]>, Error, MakeOrderPayload>
) => {
  return useMutation<APIResponse<OrderType[]>, Error, MakeOrderPayload>(
    (payload: MakeOrderPayload) => {
      console.log('Sending order payload:', payload);
      return orderServices.createOrderApi(payload);
    },
    {
      onSuccess: (data) => {
        console.log('Order created successfully:', data);
        alert('Order placed successfully!');
      },
      onError: (error: Error) => {
        console.error('Error creating order:', error.message);
        alert('Failed to create order. Please try again.');
      },
      ...options,
    }
  );
};

export default useCreateOrder;
