import request from '@/utils/request'

// 查询设计工单列表
export function listWorkorder(query) {
  return request({
    url: '/pm/workorder/list',
    method: 'get',
    params: query
  })
}

// 查询设计工单详细
export function getWorkorder(id) {
  return request({
    url: '/pm/workorder/' + id,
    method: 'get'
  })
}

// 新增设计工单
export function addWorkorder(data) {
  return request({
    url: '/pm/workorder',
    method: 'post',
    data: data
  })
}

// 修改设计工单
export function updateWorkorder(data) {
  return request({
    url: '/pm/workorder',
    method: 'put',
    data: data
  })
}

// 删除设计工单
export function delWorkorder(id) {
  return request({
    url: '/pm/workorder/' + id,
    method: 'delete'
  })
}

export function dofinish(workorderId){
  return request({
    url: '/pm/workorder/'+workorderId,
    method: 'put'
  })
}

// 查询设计工单采购BOM列表
export function listWorkorderBom(query) {
  return request({
    url: '/pm/workorder/listbom',
    method: 'get',
    params: query
  })
}

// 查询设计工单采购BOM详细
export function getWorkorderBom(id) {
  return request({
    url: '/pm/workorder/bom/' + id,
    method: 'get'
  })
}

// 新增设计工单Bom
export function addWorkorderBom(data) {
  return request({
    url: '/pm/workorder/addbom',
    method: 'post',
    data: data
  })
}

// 修改设计工单Bom
export function updateWorkorderBom(data) {
  return request({
    url: '/pm/workorder/editbom',
    method: 'put',
    data: data
  })
}

// 删除设计工单Bom
export function delWorkorderBom(id) {
  return request({
    url: '/pm/workorder/bom/' + id,
    method: 'delete'
  })
}

// 导入设计工单Bom
export function importWorkorderBom() {
  return request({
    url: '/pm/workorder/' + id + '/importBom',
    method: 'post'
  })
}