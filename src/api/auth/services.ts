import axios from "axios";
import React from "react";
import { LoginType } from "./types";

const baseUrl = "/User";

const userLogin = async (credentials: LoginType) => {
  const request = await axios.post(`${baseUrl}/login`, credentials);
  return request.data;
};

export default { userLogin };
