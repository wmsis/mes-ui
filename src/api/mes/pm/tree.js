import request from '@/utils/request'

// 查询项目管理列表
export function listTree(query) {
  return request({
    url: '/pm/tree/list',
    method: 'get',
    params: query
  })
}

// 查询项目管理详细
export function getTree(id) {
  return request({
    url: '/pm/tree/' + id,
    method: 'get'
  })
}

// 新增项目管理
export function addTree(data) {
  return request({
    url: '/pm/tree',
    method: 'post',
    data: data
  })
}

// 修改项目管理
export function updateTree(data) {
  return request({
    url: '/pm/tree',
    method: 'put',
    data: data
  })
}

// 删除项目管理
export function delTree(id) {
  return request({
    url: '/pm/tree/' + id,
    method: 'delete'
  })
}

// 查询项目列表（排除节点）
export function listTreeExcludeChild(id) {
  return request({
    url: '/pm/tree/list/exclude/' + id,
    method: 'get'
  })
}

// 查询项目下拉树结构
export function treeselect() {
  return request({
    url: '/pm/tree/treeselect',
    method: 'get'
  })
}
