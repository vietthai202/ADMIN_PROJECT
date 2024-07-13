import fetch from 'auth/FetchInterceptor'

const userService = {}

userService.getAllUser = function (params) {
  return fetch({
    url: '/User/GetAllUser',
    method: 'get',
  })
}

userService.getCountUser = function (params) {
  return fetch({
    url: '/User/GetCountUser',
    method: 'get',
  })
}
userService.getUserId = function (id) {
  return fetch({
    url: `/User/GetAnUser?id=${id}`,
    method: 'get',
  })
}


userService.updateUser = function (dataBody) {
  return fetch({
    url: '/User/UpdateAnUser',
    method: 'put',
    data: dataBody
  })
}



export default userService