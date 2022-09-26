import fooyoRequest from '../request'

export function getDetailInfos(houseId) {
  return fooyoRequest.get({
    url: '/detail/infos',
    params: {
      houseId,
    },
  })
}
