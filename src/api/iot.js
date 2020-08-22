import http from 'axios';

/**
 * 查询所有传感器信息
 * @param param
 * @returns {*}
 */
export function getIotInfo(){
  return http.get('iot/getSensor01');
}
/**
 * 查询某一个传感器信息
 * @param param
 * @returns {*}
 */
export function getIotOneInfo(param){
  http.defaults.headers.post['Content-Type'] = 'application/json';
  return http.post('iot/getSensorInfo',JSON.stringify(param));
}
