import fetch from 'auth/FetchInterceptor'

const orderSettingService = {}

orderSettingService.getOrderDetailByOrder = function (params) {
  return fetch({
    url: '/OrderDetail/GetAllOrderDetail/'+ params,
    method: 'get',
  })
}

orderSettingService.getAllOrderDetails = function () {
  return fetch({
    url: '/OrderDetail/GetAllOrderDetails',
    method: 'get',
    
  })
}

export default orderSettingService