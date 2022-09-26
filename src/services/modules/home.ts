import fooyoRequest from '../request'

export function getHomeHotSuggests() {
  return fooyoRequest.get({
    url: '/home/hotSuggests',
  })
}

export function getHomeCategories() {
  return fooyoRequest.get({
    url: '/home/categories',
  })
}

export function getHomeHouselist(currentPage) {
  return fooyoRequest.get({
    url: '/home/houselist',
    params: {
      page: currentPage,
    },
  })
}
