import request from '@/utils/request'

export async function queryProse(): Promise<any> {
  return request('/project/prose')
}

export async function getLogin(data): Promise<any> {
  return request({
    method: 'POST',
    url: 'v1/users/sign_in',
    data,
  })
}

export async function getSellables(params): Promise<any> {
  return request({
    method: 'GET',
    url: 'v1/sellables',
    params,
  })
}

export async function getProducts(id): Promise<any> {
  return request({
    method: 'GET',
    url: `v1/products/${id}`,
  })
}

export async function getQuotation(data): Promise<any> {
  return request({
    method: 'POST',
    url: 'v1/orders/request_quotation',
    data,
  })
}
