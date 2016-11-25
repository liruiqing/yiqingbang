/**
 * Created by Administrator on 2015/5/7 0007.
 */


/*计划后普通分享*/
function get_weixin_model1(){
    return {
        title:parse_emoji(getNickname())+"向您推荐了1717帮互助平台",
        title_people:parse_emoji(getNickname())+"向您推荐了1717帮互助平台",
        link:url_parse(BASE.BASE+'#/main?share_get_money_openid='+getOpenId()),
        //imgUrl:BASE.BASE+'img/logo.png',
        //imgUrl:getImgUrl(),
        imgUrl:BASE.BASE+'img/logefang.png',
        desc:parse_emoji(getNickname())+'向您推荐了1717帮互助平台，他邀请你也来看看，在这里让大家一起互帮互助，共担风雨。',
        desc_people:'他邀请你也来看看，在这里让大家一起互帮互助，共担风雨。'
    };
}




/*加入计划前*/
function get_weixin_model2(){
    return {
        title:"1717帮",
        title_people:"1717帮",
        link:url_parse(BASE.BASE+'#/main?flag=1'),
        imgUrl:BASE.BASE+'img/logefang.png',
        desc:'这是一家保障我们未来的帮会，你知道吗？（1717帮）',
        desc_people:'这是一家保障我们未来的帮会，你知道吗？（1717帮）'
    };
}

/*自己送个别人一块钱*/
function get_weixin_model3(){
    return{
        title:parse_emoji(getNickname())+"给你包红包啦！",
        title_people:parse_emoji(getNickname())+"给你包红包啦！",
        link:url_parse(BASE.BASE+'#/main?share_openid='+getOpenId()+'&money=1'),
        //imgUrl:getImgUrl(),
        imgUrl:BASE.BASE+'img/logefang.png',
        desc:parse_emoji(getNickname())+'给你包红包啦！快到1717帮去查收吧！',
        desc_people:'快到1717帮去查收吧！'
    };

}

/* 事件分享*/
function get_weixin_model4(){
    return {
        title:"1717帮",
        title_people:"1717帮",
        link:url_parse(BASE.BASE+'#/main?share_get_money_openid='+getOpenId()),
        //imgUrl:getImgUrl(),
        imgUrl:BASE.BASE+'img/logefang.png',
        desc:'我们互助帮会的孩子，需要你的帮助，请帮我传播一下来募集更多的帮助，谢谢!',
        desc_people:'我们互助帮会的孩子，需要你的帮助，请帮我传播一下来募集更多的帮助，谢谢!'
    };
}

/* 自愿捐助榜，我的贡献分享*/
function get_weixin_model5(){
    return {
        title:"1717帮",
        title_people:"1717帮",
        link:url_parse(BASE.BASE+'#/main?share_get_money_openid='+getOpenId()),
        //imgUrl:getImgUrl(),
        imgUrl:BASE.BASE+'img/logefang.png',
        desc:'救助一个可爱的生命，我出了一份微薄之力，你可否也帮TA一把。',
        desc_people:'救助一个可爱的生命，我出了一份微薄之力，你可否也帮TA一把。'
    };
}

/* 首次入帮分享*/
function get_weixin_model6(){
    return {
        title:"1717帮",
        title_people:"1717帮",
        link:url_parse(BASE.BASE+'#/main?share_get_money_openid='+getOpenId()),
        //imgUrl:getImgUrl(),
        //imgUrl:BASE.BASE+'img/logo.png',
        imgUrl:BASE.BASE+'img/logefang.png',
        desc:parse_emoji(getNickname())+'的孩子已经在“守护天使”的保护之下了，别犹豫，一定要来1717帮看看！',
        desc_people:parse_emoji(getNickname())+'的孩子已经在“守护天使”的保护之下了，别犹豫，一定要来1717帮看看！'
    };
}

function url_parse(url){
    var redirect_uri = encodeURIComponent(url);
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+BASE.appid+'&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
}

function parse_emoji(str){
    var arr = str.match(/&#[0-9]+\;/g);
    var arr_unicode = str.split(/&#[0-9]+\;/g);

    var index = 0;
    for(var i= 0,len=arr_unicode.length;i<len;i++){
        if(arr_unicode[i]==''){
            arr_unicode[i] = unicodeHtmlEntity(arr[index]);
            index++;
        }
    }
    return arr_unicode.join('');
}

function unicodeHtmlEntity (t) {
    var hex = t.charAt(2) === 'x';
    var base = hex ? 16 : 10;
    var pos = hex ? 3 : 2;
    var numericValue = parseInt(t.slice(pos, -1), base);
    return String.fromCharCode(numericValue);

}