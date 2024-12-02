import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import type { LoginType, LoginResponse } from "./types";

import authServices from "./services";

export const loginMutation = {
  useMutation: (
    opt?: UseMutationOptions<LoginResponse, Error, LoginType, void>
  ) =>
    useMutation({
      mutationKey: ["userLogin"],
      mutationFn: (payload: LoginType) => authServices.userLogin(payload),
      ...opt,
    }),
};
