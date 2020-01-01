const context = {};
context.imageServer='https://gstptravel.oss-cn-zhangjiakou.aliyuncs.com/static/images/';
context.baseUrl ='';
{
    if(location.hostname==='gstp.huntauto.com.cn'){
        context.baseUrl ='https://gstp.huntauto.com.cn/api';
    }else{
        context.baseUrl ='https://gstpadmin.huntauto.com.cn/api' ;
    }
}
context.pageUrl = 'https://gstp.huntauto.com.cn/index.html';
export default context;
