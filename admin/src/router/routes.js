import BasicLayoutIndex from '@/components/BasicLayoutIndex'
import IndexList from '@/pages/IndexList'
import IndexListClassify from '@/pages/IndexListClassify'
import AritcleContent from '@/pages/AritcleContent'
import BasicLayout from '@/components/BasicLayout'
import Login from '@/pages/Login'
import User from '@/pages/User'
import Classify from '@/pages/Classify'
import Aritcle from '@/pages/Aritcle'
import ArticleCreate from '@/pages/ArticleCreate'
import ArticleEdit from '@/pages/ArticleEdit'

export default [
  {
    path: '/',
    component: BasicLayoutIndex,
    children: [
      {
        path: '/',
        name: 'Index',
        component: IndexList,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/index/:id',
        name: 'IndexList',
        component: IndexListClassify,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/index/aritcle/:id',
        name: 'AritcleContent',
        component: AritcleContent,
        meta: {
          title: '文章内容'
        }
      },
      {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
          title: '登录'
        }
      }
    ]
  },
  {
    path: '/admin',
    component: BasicLayout,
    children: [
      {
        path: '/admin/user',
        name: 'User',
        component: User,
        meta: {
          title: '用户列表'
        }
      },
      {
        path: '/admin/classify',
        name: 'Classify',
        component: Classify,
        meta: {
          title: '分类列表'
        }
      },
      {
        path: '/admin/aritcle',
        name: 'Aritcle',
        component: Aritcle,
        meta: {
          title: '文章列表'
        }
      },
      {
        path: '/admin/article/create',
        name: 'ArticleCreate',
        component: ArticleCreate,
        meta: {
          title: '文章添加'
        }
      },
      {
        path: '/admin/article/edit/:id',
        name: 'ArticleEdit',
        component: ArticleEdit,
        meta: {
          title: '文章修改'
        }
      }
    ]
  }
]
