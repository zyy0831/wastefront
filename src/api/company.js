import http from 'axios';

/**
 * 查询某一个设施信息
 */
export function getCompany(){
  return http.get('company/getcompany');
}