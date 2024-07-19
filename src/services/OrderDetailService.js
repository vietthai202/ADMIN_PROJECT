import fetch from 'auth/FetchInterceptor'

const orderDetailService = {}

orderDetailService.getOrderDetailByOrder = function (params) {
  return fetch({
    url: '/OrderDetail/GetAllOrderDetail/'+ params,
    method: 'get',
  })
}

orderDetailService.getAllOrderDetails = function () {
  return fetch({
    url: '/OrderDetail/GetAllOrderDetails',
    method: 'get',
  })
}

export default orderDetailService