import axios, { AxiosResponse } from "axios";
import { camelizeKeys } from "humps";

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosClient.interceptors.response.use((response: AxiosResponse<any>) => {
  response.data = camelizeKeys(response.data);

  return response;
});

export default axiosClient;
