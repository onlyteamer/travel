import axios from 'axios';

let server = {};

const ajaxUrl = 'https://gstpapi.huntauto.com.cn';

server.axios = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    withCredentials: true
});


let baas = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    withCredentials: true
});
//添加请求拦截器(后台验证Token先找头部信息是否包含)
baas.interceptors.request.use(function (config) {
    //在发送请求之前做某事
    if (localStorage.getItem('token')) {
        let accesstoken = localStorage.getItem('token');
        config.headers['token'] = accesstoken;
    }
    return config;
});

//如果头部信息不包含Token，就到参数里面找，也就是?后面或者别的参数后面&去拼
server.addToken = function(url){
    // url添加token信息，用于解决window.open没办法携带参数问题
    if(url.indexOf('?') === -1){
        url+='?';
    }
    let accesstoken = localStorage.getItem('token');
    return url+'&token='+accesstoken;
};
//添加响应拦截器
baas.interceptors.response.use(function (response) {
    //对响应数据做些事
    // if (response && response.data && response.data.login === false) {
    //     throw new Error('logout');
    // }
    return response;
});

server.sendRequest = function (options) {
    return new window.Promise((resolve) => {
        baas.post(options.url, options.params || {}).then((response) => {
            resolve(response);
        }).catch((error) => {

        });
    });
};

export default server;