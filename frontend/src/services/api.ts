import axios, {
  AxiosError,
  isAxiosError,
  InternalAxiosRequestConfig,
} from "axios";
import { token } from "utils/token";

interface IAxiosRequestConfig extends InternalAxiosRequestConfig {
  _isRetry?: boolean;
}

const { VITE_API_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_URL,
  withCredentials: true,
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
    const originalReq: IAxiosRequestConfig | undefined = err.config;

    if (err.response?.status === 401 && originalReq && !originalReq._isRetry) {
      originalReq._isRetry = true;

      try {
        const { data } = await axios.post<{ accessToken: string }>(
          `${VITE_API_URL}/users/refresh`,
          undefined,
          { withCredentials: true }
        );

        token.save(data.accessToken);

        return api.request(originalReq!);
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 401) {
          token.clear();
        }
      }
    }

    return Promise.reject(err);
  }
);

export { api };
