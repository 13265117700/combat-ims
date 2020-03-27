import request from './request'
import api from './api'

export default {
  classifyShow: function (data ={}) {
    return request.get(api.classifyShow, data)
  },
  classifyAdd: function (data ={}) {
    return request.post(api.classifyShow, data)
  },
  classifyEdit: function (id, data ={}) {
    return request.put(api.classify(id), data)
  },
  classifyDelete: function (id) {
    return request.delete(api.classify(id))
  }
}