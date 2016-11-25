"use strict";

demoApp.filter('reverse',function(){
    return function(text){
        return text.splice('').reverse().join("");
    }
});

demoApp.filter('cutStrFilter',function(){
    return function(text,len){
        var strLen = len||25;
        if(text){
            if(text.length<strLen){
                return text;
            }
            return text.substr(0,strLen)+"...";
        }
        return "";
    }
});




demoApp.filter('filter_type',function(){
    return function(type){
        var obj = ["平台扣款","充值","捐款","平台清分","接受赠送","您的红包已送给好友"];
        //var obj = ["平台扣款","充值","捐款","平台清分","接受赠送","赠送"];
        if(type){
            //console.log(type)
            return obj[type];
        }
        return "";;
    }
});

demoApp.filter('filter_money_type',function(){
    return function(str,type){
         if(type===0){
             return '平台扣款';
         }else if(type==1){
            return '充值';
         }else if(type==2){
             return str+'受助事件';
         }else if(type==3){
             return '平台清分';
         }else if(type==4){
             return '接受赠送';
         }else if(type==5){
             return '赠送';
         }
          return "";;
    }
});


function parseLittleNum(str){
    return (str-0)<10?( '0'+str):str;
}

demoApp.filter('filter_abs',function(){
    return function(str){
        return Math.abs(str);

    }
});


