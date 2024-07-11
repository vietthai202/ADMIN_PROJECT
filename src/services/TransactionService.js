import fetch from 'auth/FetchInterceptor'

const transactionService = {}

transactionService.getAllTransaction = function () {
  return fetch({
    url: '/Order/GetCountOrder',
    method: 'get',
  })
}

transactionService.getAllOrder = function () {
  return fetch({
    url: '/Order/GetAllOrder',
    method: 'get',
  })
}

transactionService.getAllOrders = function () {
  return fetch({
    url: '/Order/GetAllOrders',
    method: 'get',
  })
}


export default transactionService