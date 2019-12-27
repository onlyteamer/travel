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
context.wxGetConfigUrl='https://gstp.huntauto.com.cn/wx/redirect/wxfe42689b9e435f72/signature?url=https://gstp.huntauto.com.cn/travel/demo.html';
context.wxGetPosition = 'http://gstpapi.huntauto.com.cn/wx/redirect/wxfe42689b9e435f72/signature?url=http://gstpapi.huntauto.com.cn/travel/demo.html';
export default context;
