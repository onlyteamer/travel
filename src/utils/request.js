import axios from 'axios';
import qs from 'querystring'
import context from "./context";

let server = {};


const config = {
    timeout: 30000,
    withCredentials: true,// 访问线上api时axios发送跨域请求时需要设置这个参数
};

if(location.hostname ==='gstp.huntauto.com.cn'){
    config.baseURL  = context.baseUrl;
}else{

}

server.axios = axios.create(config);

let baas = axios.create(config);

let fileBaas = axios.create(config);

//添加请求拦截器(后台验证Token先找头部信息是否包含)
fileBaas.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'multipart/form-data';
    //在发送请求之前做某事
    if (localStorage.getItem('openid') && localStorage.getItem("isLogin") === '1') {
        let openid = localStorage.getItem('openid');
        config.headers['openid'] = openid;
    } else {
        server.axios.get('/api/wx/authorize')
            .then(function (response) {
                    //获取到验证URL,给微信发送请求
                    let authURL = response.data.data.url;
                    window.location.href = authURL;
                }
            ).catch(function (error) {
            console.log(error);
        });
    }
    return config;
});


//添加请求拦截器(后台验证Token先找头部信息是否包含)
baas.interceptors.request.use(function (config) {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    //在发送请求之前做某事
    if (localStorage.getItem('openid') && localStorage.getItem("isLogin") === '1') {
        let openid = localStorage.getItem('openid');
        config.headers['openid'] = openid;
    } else {
        // localStorage.setItem("openid","abcdefghigklmm");
        // axios.post(
        //     ajaxUrl+ '/wx/login', qs.stringify({openid:localStorage.getItem("openid")})).then((res)=>{
        //         console.log(res);
        //     if(res.data.data.isLogin==="1"){
        //         //登陆成功
        //         localStorage.setItem("isLogin","1");
        //     }else{
        //         var url = document.location.toString();
        //         var arrUrl = url.split("#");
        //         // console.log();
        //         window.location.href = arrUrl[0]+"/#/register";
        //         // this.$router.push({path:'/register'})
        //     }
        // })
        // localStorage.setItem("isLogin",'1');

        server.axios.get('/api/wx/authorize')
            .then(function (response) {
                    //获取到验证URL,给微信发送请求
                    let authURL = response.data.data.url;
                    // console.log(authURL);
                // authURL =  authURL.replace('gstp','gstpapi');
                // console.log(authURL);
                    window.location.href = authURL;
                }
            ).catch(function (error) {
            console.log(error);
        });
    }
    return config;
});
//如果头部信息不包含Token，就到参数里面找，也就是?后面或者别的参数后面&去拼
server.addToken = function (url) {
    // url添加token信息，用于解决window.open没办法携带参数问题
    if (url.indexOf('?') === -1) {
        url += '?';
    }
    let openid = localStorage.getItem('openid');
    return url + '&openid=' + openid;
};

//添加响应拦截器
baas.interceptors.response.use(function (response) {
    //对响应数据做些事
    if (response && response.data && response.data.login === false) {
        throw new Error('logout');
    }
    return response;
});


server.sendPost = function (options) {
    return new window.Promise((resolve) => {
        baas.post('/api'+options.url, qs.stringify(options.params) || {}).then((response) => {
            resolve(response);
        }).catch((error) => {

        });
    });
};
server.sendGet = function (options) {
    return new window.Promise((resolve) => {
        baas.get('/api'+options.url + '?' + qs.stringify(options.params)).then((response) => {
            resolve(response);
        }).catch((error) => {

        });
    });
};
server.uploadFile = function (options) {
    return new window.Promise((resolve) => {
        baas.post('/api'+options.url, options.params).then((response) => {
            resolve(response);
        }).catch((error) => {

        });
    });
};
export default server;