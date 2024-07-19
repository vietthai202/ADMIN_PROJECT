import fetch from 'auth/FetchInterceptor'

const orderService = {}

orderService.getAllTransaction = function () {
  return fetch({
    url: '/Order/GetCountOrder',
    method: 'get',
  })
}

orderService.exportReport = function () {
  return fetch({
    url: '/Order/ExportOrders',
    method: 'get',
    responseType: 'blob'
  })
}

orderService.getAllOrder = function (status) {
  let url = '/Order/GetAllOrder';
  if (status !== undefined && status !== null) {
    url += `?status=${status}`;
  }
  return fetch({
    url: url,
    method: 'get',
  });
}



orderService.UpdateOrder = function (formData) {
  return fetch({
    url: `/Order/UpdateAOrder`,
    method: 'post',
    data: formData
  })
}


export default orderService