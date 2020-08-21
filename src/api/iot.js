import http from 'axios';

/**
 * 查询所有传感器信息
 * @param param
 * @returns {*}
 */
export function getIotInfo(){
  return http.get('iot/getSensor01');
}
