import Mock from 'mockjs'

const resultSuccess = (data, msg = 'pass') => {
  return { code: 1, data, msg }
}
const resultFail = (msg, code = 0) => {
  return { code, data: '', msg }
}

const info = {
  url: '/user/info',
  type: 'get',
  response: ({ query }) => {
    const { token } = query
    if(!['token_user1', 'token_user'].includes(token)){
      return resultFail('登录失败，无法获取用户详细信息。', 50008)
    }
    return {
      code: 20000,
      data: {
        roles: ['A'],
        name: 'admin',
        avater: 'bobo',
        introduction: '',
        permissionIdents: [{ pageCode: 'User', pageBtns: ['add', 'look'] }, { pageCode: 'SysManage' }, { pageCode: 'Role', pageBtns: ['add'] }, { pageCode: 'Permissions' }]
      }
    }
  }
}
const login = {
  url: '/user/login',
  type: 'post',
  response: ({ body }) => {
    if(['user1', 'user'].includes(body.username)){
      let token = ''
      if(body.username === 'user1'){
        token = 'token_user1'
      } else if(body.username === 'user'){
        token = 'token_user'
      }
      return resultSuccess(token)
    } else {
      return resultFail('用户不存在')
    }
  }
}
const logout = {
  url: '/user/logout',
  type: 'post',
  response: _ => {
    return {
      code: 20000,
      msg: '成功'
    }
  }
}
const userList = {
  url: '/user/getUserList',
  type: 'get',
  response: _ => {
    return {
      data: {
        'list|10': [{
          'id|+1': 1,
          userName: '@cname',
          'sex|1': ['男', '女'],
          'age|18-60': 20,
          portrait: Mock.Random.image('25x25'),
          'enabled|1': ['启用', '禁用']
        }],
        total: 10
      },
      code: 200
    }
  }
}
export default [
  info,
  login,
  logout,
  userList
]
