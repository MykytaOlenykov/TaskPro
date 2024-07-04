import axios, { AxiosError, AxiosRequestConfig, isAxiosError } from "axios";
import { token } from "utils/token";

interface MyAxiosRequestConfig extends AxiosRequestConfig {
  _isRetry?: boolean;
}

const { VITE_API_URL } = import.meta.env;

const api = axios.create({
  withCredentials: true,
  baseURL: VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const accessToken = token.get();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalReq: MyAxiosRequestConfig | undefined = err.config;

    if (err.response?.status === 401 && originalReq && !originalReq._isRetry) {
      try {
        originalReq._isRetry = true;

        const { data } = await api.post<{ accessToken: string }>(
          "users/refresh"
        );

        token.save(data.accessToken);

        return api.request(originalReq!);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          token.clear();
        }

        throw error;
      }
    }

    throw err;
  }
);

export { api };
