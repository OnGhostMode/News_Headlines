import axiosConfig from './AxiosConfig';

export default async function Caller(type, url, data, headers, params) {
  return axiosConfig.request({
    method: type,
    url: url,
    data: data,
    headers: headers,
    params: params,
  });
}
