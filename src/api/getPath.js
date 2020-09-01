import http from 'axios';

/**
 * 下载图片
 */
export function getImgPath(id){
    let path = 'img/img/'+id;
    return http.get(path);
  }