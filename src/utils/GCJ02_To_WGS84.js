// https://blog.csdn.net/qq_36377037/article/details/86479796
let Sz05

// 入口
Sz05.forEach(i => {
    var res84 = gcj02_to_wgs84(i[0], i[1]);
    console.log('['+ res84[0] + ', ' + res84[1]+'],')
})


//wgs84_to_gcj02.js文件

//地标 转 国测 常量
var x_PI = (3.14159265358979324 * 3000.0) / 180.0;


//判断是否在国内，在中国国内的经纬度才需要做偏移
function out_of_china(lng, lat) {
    return (
        lng < 72.004 ||
        lng > 137.8347 ||
        (lat < 0.8293 || lat > 55.8271 || false)
    );
}

//转化经度
function transformlng(lng, lat) {
    var ret =
        300.0 +
        lng +
        2.0 * lat +
        0.1 * lng * lng +
        0.1 * lng * lat +
        0.1 * Math.sqrt(Math.abs(lng));
    ret +=
        ((20.0 * Math.sin(6.0 * lng * 3.1415926535897932384626) +
                20.0 * Math.sin(2.0 * lng * 3.1415926535897932384626)) *
            2.0) /
        3.0;
    ret +=
        ((20.0 * Math.sin(lng * 3.1415926535897932384626) +
                40.0 * Math.sin((lng / 3.0) * 3.1415926535897932384626)) *
            2.0) /
        3.0;
    ret +=
        ((150.0 * Math.sin((lng / 12.0) * 3.1415926535897932384626) +
                300.0 * Math.sin((lng / 30.0) * 3.1415926535897932384626)) *
            2.0) /
        3.0;
    return ret;
}

//转化纬度
function transformlat(lng, lat) {
    var ret = -100.0 +
        2.0 * lng +
        3.0 * lat +
        0.2 * lat * lat +
        0.1 * lng * lat +
        0.2 * Math.sqrt(Math.abs(lng));
    ret +=
        ((20.0 * Math.sin(6.0 * lng * 3.1415926535897932384626) +
                20.0 * Math.sin(2.0 * lng * 3.1415926535897932384626)) *
            2.0) /
        3.0;
    ret +=
        ((20.0 * Math.sin(lat * 3.1415926535897932384626) +
                40.0 * Math.sin((lat / 3.0) * 3.1415926535897932384626)) *
            2.0) /
        3.0;
    ret +=
        ((160.0 * Math.sin((lat / 12.0) * 3.1415926535897932384626) +
                320 * Math.sin((lat * 3.1415926535897932384626) / 30.0)) *
            2.0) /
        3.0;
    return ret;
}

//wgs84 to gcj02   地球坐标系 转 火星坐标系
function wgs84_to_gcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat];
    } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = (lat / 180.0) * 3.1415926535897932384626;
        var magic = Math.sin(radlat);
        magic = 1 - 0.00669342162296594323 * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat =
            (dlat * 180.0) /
            (((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtmagic)) * 3.1415926535897932384626);
        dlng =
            (dlng * 180.0) / ((6378245.0 / sqrtmagic) * Math.cos(radlat) * 3.1415926535897932384626);
        var mglat = lat + dlat;
        var mglng = lng + dlng;

        return [mglng, mglat];
    }
}


//gcj02 to wgs84  火星坐标系 转 地球坐标系
function gcj02_to_wgs84(lng, lat) {
    if (out_of_china(lng, lat)) {
        return [lng, lat]
    } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * 3.1415926535897932384626;
        var magic = Math.sin(radlat);
        magic = 1 - 0.00669342162296594323 * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtmagic) * 3.1415926535897932384626);
        dlng = (dlng * 180.0) / (6378245.0 / sqrtmagic * Math.cos(radlat) * 3.1415926535897932384626);
        mglat = lat + dlat;
        mglng = lng + dlng;
        return [lng * 2 - mglng, lat * 2 - mglat]
    }
}