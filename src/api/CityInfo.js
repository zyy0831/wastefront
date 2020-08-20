import http from 'axios';

/**
 * 查询城市基本信息
 * @param param
 * @returns {*}
 */
export function getCityInfo(param){
  http.defaults.headers.post['Content-Type'] = 'application/json';
  return http.post('/cityInfo/get',JSON.stringify(param));
}
