import request from './request'
import api from './api'

export default {
  breadcrumb: function (data = {}) {
    return request.get(api.index, data)
  },
  aritcleIndex: function (data = {}) {
    return request.get(api.aritcleIndex, data)
  },
  articleClassifyIndex: function (id, data = {}) {
    return request.get(api.articleClassifyIndex(id), data)
  },
  articleContent: function (id, data = {}) {
    return request.get(api.articleContent(id), data)
  },
  login: function (data ={}){
    return request.post(api.login,data)
  }
}