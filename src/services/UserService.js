import fetch from 'auth/FetchInterceptor'

const userService = {}

userService.getAllUser = function (params) {
  return fetch({
    url: '/User/GetAllUser',
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