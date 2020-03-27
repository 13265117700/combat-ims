export default {
  index: `/all`,
  aritcleIndex: `/all/index`,
  articleClassifyIndex: (id) => `/all/index/${id}`,
  articleContent: (id) => `/all/index/aritcle/${id}`,
  login: `/all/login`,
  userShow: `/api/admin/user`,
  user: (id) => `/api/admin/user/${id}`,
  classifyShow: `/api/admin/classify`,
  classify: (id) => `/api/admin/classify/${id}`,
  aritcleShow: '/api/admin/article',
  aritcleDelete: (id) => `/api/admin/article/${id}`,
  aritcleEdit: (id) => `/api/admin/article/edit/${id}`,
  aritcleAdd: `/api/admin/article/create`
}