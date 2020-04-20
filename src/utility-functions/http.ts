import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface HTTPRequestType {
  url: string;
  method?: 'get' | 'post' | 'put' | 'delete';
  params?: Object;
  headers?: Object;
  body?: Object;
  formData?: FormData;
  type?: string;
}

export const BASE_URL = 'https://connectedenterprise.adelear.com/backend/api';

export const initHttp = () => {
  axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const jwt = localStorage['adal.idtoken'];

    config.headers = config.headers || {};
    if (jwt) {
      config.headers['Authorization'] = `Bearer ${jwt}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: AxiosError) => err
  );
};

const request = ({
  url,
  method = 'get',
  params = {},
  headers = {},
  body = {},
  formData,
  type = 'application/json'
}: HTTPRequestType) => {
  const baseUrl = BASE_URL;

  if (!url) {
    return Promise.reject(new Error('Request URL is undefined'));
  }

  const urlParams = {
    ...params
  };
  const reqHeaders = {
    Accept: 'application/json',
    'Content-Type': type,
    ...headers
  };

  return axios({
    method,
    url: `${baseUrl}${url}`,
    data: formData || JSON.stringify(body),
    params: urlParams,
    headers: reqHeaders
  });
};

export default request;
