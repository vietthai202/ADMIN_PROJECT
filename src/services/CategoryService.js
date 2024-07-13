import fetch from 'auth/FetchInterceptor'

const categoryService = {}

categoryService.getAllCategory = function (params) {
    return fetch({
        url: '/Category/GetAllCategory',
        method: 'get',
        params
    })
}
categoryService.createCategory = function (formData) {
    return fetch({
      url: '/Category/AddCategory',
      method: 'post',
      data: formData
    })
  }
  categoryService.updateCategory = function (formData) {
    return fetch({
      url: '/Category/UpdateCategory',
      method: 'put',
      data: formData
    })
  }
  categoryService.deleteCategory = function (formData) {
    return fetch({
      url: '/Category/DeleteCategory',
      method: 'post',
      data: formData
    })
  }
export default categoryService