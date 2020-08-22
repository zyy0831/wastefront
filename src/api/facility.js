import http from 'axios';

/**
 * 查询某一个设施信息
 */
export function getFacInfo(){
  return http.get('fac/getFac01');
}
/**
 * 查询某一个设施信息
 * @param param
 * @returns {*}
 */
export function getFacOneInfo(param){
  http.defaults.headers.post['Content-Type'] = 'application/json';
  return http.post('fac/getFacInfo',JSON.stringify(param));
}
