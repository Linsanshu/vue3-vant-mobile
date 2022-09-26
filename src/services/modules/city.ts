import fooyoRequest from '../request'

export function getCityAll() {
  return fooyoRequest.get({
    url: '/city/all',
  })
}
