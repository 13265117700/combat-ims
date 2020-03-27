import request from './request'
import api from './api'

export default {
  aritcleShow: function (data ={}) {
    return request.get(api.aritcleShow,data)
  },
  aritcleDelete: function(id){
    return request.delete(api.aritcleDelete(id))
  },
  aritcleEditShow: function(id, data ={}){
    return request.get(api.aritcleEdit(id),data)
  },
  aritcleEdit: function(id, data ={}){
    return request.put(api.aritcleEdit(id),data)
  },
  aritcleAdd: function(data ={}){
    return request.post(api.aritcleAdd,data)
  }
}