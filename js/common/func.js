/**
 * Created by Administrator on 2015/4/8 0008.
 */
function is_num(str){
    return isNaN(str)?false:true;
}

function is_num2(str){
    var patrn = /^\d*(\.\d*)?$/;
    return patrn.test(str)&&str?true:false;
}

function request(paras)
{
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (var i= 0,j; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}

/*if(is_weixin()){
    alert("weixin");
}else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent);
    alert("iPhone");
} else if (/(Android)/i.test(navigator.userAgent)) {
    //alert(navigator.userAgent);
    alert("Android");
} else {
    alert("pc");
};*/

function is_weixin(){
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
        return true;
    } else {
        return false;
    }
}

function show_log_alert(str){
  if(typeof str =='object'){
      console.log(JSON.stringify(str));
      alert(JSON.stringify(str));
  }else{
      console.log(str);
      alert(str);
  }
}
function show_log(str){
    if(typeof str =='object'){
        console.log(JSON.stringify(str));
    }else{
        console.log(str);
    }
}

function isEmptyObj(obj)
{
    for (var name in obj)
    {
        return false;
    }
    return true;
};



function getOpenId(){
//return 'o1TKas-nPZja9DNUzfHSoyPTF23o';

    if(localStorage.getItem("userInfo")){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
            return userInfo.id;
        }

    }
    return false;
}


function getPayOpenid(){
//return 'oA3oPwTQAvlAEn7zPcdU_eCVn0yg';


    if(localStorage.getItem("userInfo")){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if(userInfo){
            return userInfo.pay_open_id;
        }
    }
    return false;
}

function getUserId(){
    //return 285;

    if(localStorage.getItem("userInfo")){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return userInfo.id;
    }
    return false;
}
function getUserStatus(){
    //0 没加入 1加入
    if(localStorage.getItem("userInfo")){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return userInfo.user_status;
    }
    return 0;
}
function getNickname(){

    if(localStorage.getItem("userInfo")){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return userInfo.login_name;
    }
    return false;
}

var model_province = [{"area_id":2,"parent_id":1,"area_name":"北京","py_name":"beijing","area_type":"1","special":"0"},{"area_id":22,"parent_id":1,"area_name":"天津","py_name":"tianjin","area_type":"1","special":"0"},{"area_id":46,"parent_id":1,"area_name":"河北","py_name":"hebei","area_type":"1","special":"0"},{"area_id":240,"parent_id":1,"area_name":"山西","py_name":"shanxi","area_type":"1","special":"0"},{"area_id":371,"parent_id":1,"area_name":"内蒙古","py_name":"neimenggu","area_type":"1","special":"0"},{"area_id":486,"parent_id":1,"area_name":"辽宁","py_name":"liaoning","area_type":"1","special":"0"},{"area_id":608,"parent_id":1,"area_name":"吉林","py_name":"jilin","area_type":"1","special":"0"},{"area_id":680,"parent_id":1,"area_name":"黑龙江","py_name":"heilongjiang","area_type":"1","special":"0"},{"area_id":827,"parent_id":1,"area_name":"上海","py_name":"shanghai","area_type":"1","special":"0"},{"area_id":848,"parent_id":1,"area_name":"江苏","py_name":"jiangsu","area_type":"1","special":"0"},{"area_id":974,"parent_id":1,"area_name":"浙江","py_name":"zhejiang","area_type":"1","special":"0"},{"area_id":1077,"parent_id":1,"area_name":"安徽","py_name":"anhui","area_type":"1","special":"0"},{"area_id":1206,"parent_id":1,"area_name":"福建","py_name":"fujian","area_type":"1","special":"0"},{"area_id":1305,"parent_id":1,"area_name":"江西","py_name":"jiangxi","area_type":"1","special":"0"},{"area_id":1422,"parent_id":1,"area_name":"山东","py_name":"shandong","area_type":"1","special":"0"},{"area_id":1590,"parent_id":1,"area_name":"河南","py_name":"henan","area_type":"1","special":"0"},{"area_id":1774,"parent_id":1,"area_name":"湖北","py_name":"hubei","area_type":"1","special":"0"},{"area_id":1892,"parent_id":1,"area_name":"湖南","py_name":"hunan","area_type":"1","special":"0"},{"area_id":2029,"parent_id":1,"area_name":"广东","py_name":"guangdong","area_type":"1","special":"0"},{"area_id":2214,"parent_id":1,"area_name":"广西","py_name":"guangxi","area_type":"1","special":"0"},{"area_id":2339,"parent_id":1,"area_name":"海南","py_name":"hainan","area_type":"1","special":"0"},{"area_id":2373,"parent_id":1,"area_name":"重庆","py_name":"chongqing","area_type":"1","special":"0"},{"area_id":2416,"parent_id":1,"area_name":"四川","py_name":"sichuan","area_type":"1","special":"0"},{"area_id":2625,"parent_id":1,"area_name":"贵州","py_name":"guizhou","area_type":"1","special":"0"},{"area_id":2724,"parent_id":1,"area_name":"云南","py_name":"yunnan","area_type":"1","special":"0"},{"area_id":2870,"parent_id":1,"area_name":"西藏","py_name":"xicang","area_type":"1","special":"0"},{"area_id":2951,"parent_id":1,"area_name":"陕西","py_name":"shanxi","area_type":"1","special":"0"},{"area_id":3072,"parent_id":1,"area_name":"甘肃","py_name":"gansu","area_type":"1","special":"0"},{"area_id":3174,"parent_id":1,"area_name":"青海","py_name":"qinghai","area_type":"1","special":"0"},{"area_id":3227,"parent_id":1,"area_name":"宁夏","py_name":"ningxia","area_type":"1","special":"0"},{"area_id":3255,"parent_id":1,"area_name":"新疆","py_name":"xinjiang","area_type":"1","special":"0"}];

function getItemByName(area_name,obj){
    for(var i= 0,len=obj.length;i<len;i++){
            if(obj[i].area_name==area_name){
                return obj[i];
            }
    }
}

/*录入完信息首页分享朋友圈提示*/

function addToShare(){
    document.getElementById('isShare').style.display="block";
}


/*随机数生成0-3*/

//for(var i=0;i<1000;i++){
//    //console.log(random(1000,8000));
//}
function random(min,max){
    return Math.floor(min+Math.random()*(max-min));
}

/*获取头像*/
function getImgUrl(){
    if(localStorage.getItem("userInfo")){
        var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return userInfo.img_url;
    }
    return BASE.BASE+'img/logo.png';
}




        requestList();
        function requestList()
        {
            //alert(window.location.href);
            var rurl =BASE.BASE+'#/main?'
            //alert(1);
            var url = window.location.href;
            //alert(url)
            if(/#\/addPlan/.test(url)){
                return;
                var rurl =BASE.BASE+'#/addPlan?';

            }

            /*if(/#\/main/.test(url)){
                return;
            }*/
        if(/#\/message/.test(url)){
                return;
            }

         if(/#\/myMessage/.test(url)){
                return;
            }


            if(/#\/friends/.test(url)){
                return;
            }

            url = url.replace(/#\/main\??/,'&');
            //url = url.replace(/#\/addPlan\??/,'&');
            var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
            var paraObj = {}
            for (var i= 0,j; j=paraString[i]; i++){
                paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
            }
            var sub = '';
            //show_log_alert(paraObj);
            for(var i in paraObj){
                if(i=='code'||i=='share_openid'||i=='state'||i=='money'||i=='share_get_money_openid'||i=='flag'){
                    sub +='&'+i+'='+paraObj[i];
                }
            }
            var redirect_url  = (rurl+sub).replace('?&','?');
           // alert(redirect_url);
            if( window.location.href!=redirect_url){
                window.location.replace(redirect_url);
            }
        }


/**  手机号校验      */

function isMobile(num){
    return (/^1[3|4|5|7|8][0-9]{9}$/.test(num))?true:false;
}

function isCode(num){
    return (/^[1-9][0-9]{5}$/.test(num))?true:false;
}

function getIdCardInfo(cardNo) {
    var info = {
        isTrue : false,
        year : null,
        month : null,
        day : null,
        isMale : false,
        isFemale : false
    };
    if (!cardNo || (15 != cardNo.length && 18 != cardNo.length) ) {
        info.isTrue = false;
        return info;
    }
    if (15 == cardNo.length) {
        var year = cardNo.substring(6, 8);
        var month = cardNo.substring(8, 10);
        var day = cardNo.substring(10, 12);
        var p = cardNo.substring(14, 15); //性别位
        var birthday = new Date(year, parseFloat(month) - 1,
            parseFloat(day));
        // 对于老身份证中的年龄则不需考虑千年虫问题而使用getYear()方法
        if (birthday.getYear() != parseFloat(year)
            || birthday.getMonth() != parseFloat(month) - 1
            || birthday.getDate() != parseFloat(day)) {
            info.isTrue = false;
        } else {
            info.isTrue = true;
            info.year = birthday.getFullYear();
            info.month = birthday.getMonth() + 1;
            info.day = birthday.getDate();
            if (p % 2 == 0) {
                info.isFemale = true;
                info.isMale = false;
            } else {
                info.isFemale = false;
                info.isMale = true
            }
        }
        return info;
    }
    if (18 == cardNo.length) {
        var year = cardNo.substring(6, 10);
        var month = cardNo.substring(10, 12);
        var day = cardNo.substring(12, 14);
        var p = cardNo.substring(14, 17)
        var birthday = new Date(year, parseFloat(month) - 1,
            parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题
        if (birthday.getFullYear() != parseFloat(year)
            || birthday.getMonth() != parseFloat(month) - 1
            || birthday.getDate() != parseFloat(day)) {
            info.isTrue = false;
            return info;
        }
        var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];// 加权因子
        var Y = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];// 身份证验证位值.10代表X
        // 验证校验位
        var sum = 0; // 声明加权求和变量
        var _cardNo = cardNo.split("");
        if (_cardNo[17].toLowerCase() == 'x') {
            _cardNo[17] = 10;// 将最后位为x的验证码替换为10方便后续操作
        }
        for ( var i = 0; i < 17; i++) {
            sum += Wi[i] * _cardNo[i];// 加权求和
        }
        var i = sum % 11;// 得到验证码所位置
        if (_cardNo[17] != Y[i]) {
            return info.isTrue = false;
        }
        info.isTrue = true;
        info.year = birthday.getFullYear();
        info.month = birthday.getMonth() + 1;
        info.day = birthday.getDate();
        if (p % 2 == 0) {
            info.isFemale = true;
            info.isMale = false;
        } else {
            info.isFemale = false;
            info.isMale = true
        }
        return info;
    }
    return info;
}

//function hide_popup_back (){
//    window.location.href = "http://127.0.0.1/17b/web/#/main"
//}
//
//function make_callback_login(){
//    window.location.href = "http://127.0.0.1/17b/web/#/addPlan";
//}