import fetch from 'auth/FetchInterceptor'

const transactionService = {}

transactionService.getAllTransaction = function () {
  return fetch({
    url: '/Order/GetCountOrder',
    method: 'get',
  })
}

transactionService.getAllOrder = function (status) {
  return fetch({
    url: `/Order/GetAllOrder/${status}`,
    method: 'get',
  })
}


transactionService.UpdateOrder = function (id, status) {
  return fetch({
    url: `/Order/UpdateAOrder?id=${id}&status=${status}`,
    method: 'post',
  })
}


export default transactionService