import http from 'axios';

/**
 * 查询某一个设施信息
 */
export function getCompany(){
  return http.get('company/getcompany');
}

/**
 * 查询某一个设施信息
 */
export function getAnnualdata(){
    return http.get('annualdata/getAnnualdata');
  }

  /**
 * 查询某一个设施信息
 */
export function getlawyer(){
    return http.get('lawyers/getlawyer');
  }

  /**
 * 查询某一个设施信息
 */
export function getStock(){
    return http.get('stock/getStock');
  }