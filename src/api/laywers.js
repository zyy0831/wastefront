import http from 'axios';
/**
 * 获取暂存信息
 * @param group
 * @returns {*}
 */
export function getTempRecord() {
    return http.get('/rules/view');
  }
  export function getlaywers() {
    return http.get('/rules/view');
  }