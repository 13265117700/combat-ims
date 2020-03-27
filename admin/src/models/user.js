import request from './request'
import api from './api'

export default {
  userShow: function (data ={}) {
    return request.get(api.userShow, data)
  },
  userAdd: function (data ={}) {
    return request.post(api.userShow, data)
  },
  userEdit: function (id, data ={}) {
    return request.put(api.user(id), data)
  },
  userDelete: function (id) {
    return request.delete(api.user(id))
  }
}