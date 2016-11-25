"use strict";

//angular首次启动后调用  添加公共方法和变量
var globle_weixin ='';
var httpServiceRoot;
var commen_current = '';
demoApp.run(['$rootScope', '$location', '$templateCache', 'httpService','$timeout', function ($rootScope, $location, $templateCache, httpService,$timeout) {
    $rootScope.rootModel = {};
    $rootScope.base = {
        showLoading: false,
        showLoadingText: '',
        showPopup: false,
        showPopupTitle: '提示',
        showPopupText: "",
        showNotice: false,
        showShare: false,
        showFriends: false,
        showDouble: false,
        app_share_model:{}
    }

    httpServiceRoot=httpService;
    $rootScope.$on('$viewContentLoaded', function () {});

    init_config();
    function init_config(){
        var obj = localStorage.getItem('weixin_data');
        if(obj){
            obj = JSON.parse(obj);
            wx.config({
                debug: false,
                appId: obj.appid,
                timestamp: obj.timestamp,
                nonceStr: obj.nonceStr,
                signature: obj.signature,
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
            });

            wx.ready(function () {
                get_weixin_model1();
            });
        }

        httpService.post(BASE.URL + 'user/getTicketSign.json', '',{flag:'not_pay_type'}).success(function (data) {
            globle_weixin = data;
            localStorage.setItem('weixin_data',JSON.stringify(data));
            if (data) {
                wx.config({
                    debug: false,
                    appId: globle_weixin.appid,
                    timestamp: globle_weixin.timestamp,
                    nonceStr: globle_weixin.nonceStr,
                    signature: globle_weixin.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
                });

                wx.ready(function () {
                    init_page_wxshare(commen_current);
                });
            }
        })
    }
    /*初始化分享*/

    $timeout(function(){
        if(!globle_weixin){
            init_config();
        }
    },1500);

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if(current&&(/views\/main.html/.test(current.loadedTemplateUrl))){
            if(getOpenId()==false){
                var redirect_state=0;
                var share_get_money_openid = request('share_get_money_openid');
                if(share_get_money_openid){
                    redirect_state = share_get_money_openid;
                }
                var share_openid = request('share_openid');
                if(share_openid){
                    redirect_state = "share_openid"+share_openid;
                }


                if(is_weixin()){
                    window.location.href = 'weixin.html?state=' + redirect_state;
                }else{
                    if(localStorage.getItem('userInfo')){
                        $rootScope.moveTo('addAppPlan');
                    }else{
                        $rootScope.isShowMessage=!$rootScope.isShowMessage;

                        event.preventDefault();

                          //window.location.href="http://www.lovelynz.com/latefly/wx_login_old.html?product=angel";
                    }


                }
            }
        };
    });

    $rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
        commen_current = current;
        if(previous&&previous.loadedTemplateUrl){
            $timeout(function(){
                if(/views\/addMyInfo.html/.test(previous.loadedTemplateUrl)){
                    addToShare();
                    init_weixin(get_weixin_model6());
                }
            },200);
        }
        init_page_wxshare(current);

        $rootScope.hideLoading();
        $rootScope.hidePopup();
    });

    function init_page_wxshare(current){
        if (current && /views\/my\/friends.html/.test(current.loadedTemplateUrl)) {
            httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
                if((data.total_money>0)&&(data.share_personl=='NOT_SHARE'||data.share_personl=='PLAT_FORM')){
                    init_weixin(get_weixin_model3());
                    $timeout(function(){
                        init_weixin(get_weixin_model3());
                    },1000);
                    $timeout(function(){
                        init_weixin(get_weixin_model3());
                    },2000);
                    httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
                        localStorage.setItem("userInfo",JSON.stringify(data));
                    })
                }else{
                    init_weixin(get_weixin_model1());
                    $timeout(function(){
                        init_weixin(get_weixin_model1());
                    },1000);
                    $timeout(function(){
                        init_weixin(get_weixin_model1());
                    },2000);
                }
            });
        }else if(/views\/message.html/.test(current.loadedTemplateUrl)|| /views\/certificate.html/.test(current.loadedTemplateUrl) || /views\/juanZhu.html/.test(current.loadedTemplateUrl)){
            //init_weixin(get_weixin_model4());
            init_weixin(get_weixin_model4());
            $timeout(function(){
                init_weixin(get_weixin_model4());
            },1000);
            $timeout(function(){
                init_weixin(get_weixin_model4());
            },2000);
        }else if(  /views\/event.html/.test(current.loadedTemplateUrl)|| /views\/accounts\/juanZhuBang.html/.test(current.loadedTemplateUrl)){
            init_weixin(get_weixin_model5());
            $timeout(function(){
                init_weixin(get_weixin_model5());
            },1000);
            $timeout(function(){
                init_weixin(get_weixin_model5());
            },2000);
        }else{
            var share_userStatus = getUserStatus();
            if(share_userStatus==''||share_userStatus==null||share_userStatus==0||share_userStatus==1||share_userStatus==5){

                init_weixin(get_weixin_model2());
                $timeout(function(){
                    init_weixin(get_weixin_model2());
                },1000);
                $timeout(function(){
                    init_weixin(get_weixin_model2());
                },2000);
            }else{
                init_weixin(get_weixin_model1());
                $timeout(function(){
                    init_weixin(get_weixin_model1());
                },1000);
                $timeout(function(){
                    init_weixin(get_weixin_model1());
                },2000);
            }

        }
    }

    function init_weixin(wx_obj) {
        if(is_weixin()){
            wx.onMenuShareTimeline({
                title:wx_obj.desc,
                link: wx_obj.link, // 分享链接
                imgUrl: wx_obj.imgUrl,
                success: function () {
                    if(getOpenId()){
                        httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
                            if(data.user_status==2){
                                var obj = {};
                                if(is_weixin()){
                                    obj = {user_id:getOpenId(),flag:'WX'}
                                }else{
                                    obj = {user_id:getOpenId(),flag:'APP'}

                                }
                                httpServiceRoot.post(BASE.URL+'user/sharesucess.json','',obj).success(function(data){
                                    httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
                                        localStorage.setItem("userInfo",JSON.stringify(data));
                                        window.location.reload();
                                    });
                                });
                            }
                        });
                    }
                    httpService.post(BASE.URL+'user/recordShareNum.json','',{id:(getUserId()?getUserId():0)}).success(function(data){

                    });
                },
                cancel: function () {
                }
            });
            //分享给好友
            wx.onMenuShareAppMessage({
                title: wx_obj.title_people, // 分享标题
                desc: wx_obj.desc_people, // 分享描述
                link: wx_obj.link, // 分享链接
                imgUrl: wx_obj.imgUrl, // 分享图标
                type: 'link', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    httpService.post(BASE.URL+'user/recordShareNum.json','',{id:(getUserId()?getUserId():0)}).success(function(data){

                    });
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        }else{
            $rootScope.base.app_share_model=wx_obj;
        }
    }


    $rootScope.share_to_friends = function(){
        var app_obj = $rootScope.base.app_share_model;
        Wechat.share({
            message: {
                title: app_obj.title_people,
                description: app_obj.desc_people,
                thumb: app_obj.imgUrl,
                mediaTagName: "",
                messageExt: "",
                messageAction: "",
                media: {webpageUrl:app_obj.link}
            },
            scene: Wechat.Scene.SESSION   // share to Timeline
        }, function () {
            httpService.post(BASE.URL+'user/recordShareNum.json','',{id:(getUserId()?getUserId():0)}).success(function(data){

            });
        }, function (reason) {
        });

    }
    $rootScope.share_to_link = function(){
        var app_obj = $rootScope.base.app_share_model;

        Wechat.share({
            message: {
                title: app_obj.desc,
                description: "",
                thumb: app_obj.imgUrl,
                mediaTagName: "",
                messageExt: "",
                messageAction: "",
                media: {webpageUrl:app_obj.link}
            },
            scene: Wechat.Scene.TIMELINE   // share to Timeline
        }, function () {
            if(getOpenId()){
                httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
                    if(data.user_status==2){
                        var obj = {};
                        if(is_weixin()){
                            obj = {user_id:getOpenId(),flag:'WX'}
                        }else{
                            obj = {user_id:getOpenId(),flag:'APP'}

                        }
                        httpServiceRoot.post(BASE.URL+'user/sharesucess.json','',obj).success(function(data){
                            httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
                                localStorage.setItem("userInfo",JSON.stringify(data));
                                window.location.reload();
                            });
                        });
                    }
                });
            }
            httpService.post(BASE.URL+'user/recordShareNum.json','',{id:(getUserId()?getUserId():0)}).success(function(data){

            });
        }, function (reason) {
        });

    }


    //路由
    $rootScope.moveTo = function (url, $event) {
        $location.path(url);
        if ($event) {
            $event.stopPropagation();
            $event.preventDefault();
        }
    }
    //loading
    $rootScope.loading = function (status) {
        $rootScope.base.showLoading = ("show" == status ? true : false);
    }
    $rootScope.hideLoading = function () {
        $rootScope.base.showLoading = false;
    }
    $rootScope.showLoading = function () {
        $rootScope.base.showLoading = true;
    }

    //弹出框
    $rootScope.popup = function (status, text, title) {
        $rootScope.base.showPopupTitle = (title || '提示');
        $rootScope.base.showPopupText = (text || "");
        $rootScope.base.showPopup = ("show" == status ? true : false);
    }
    $rootScope.showPopup = function (text, title) {
        $rootScope.base.showPopupTitle = (title || '提示');
        $rootScope.base.showPopupText = (text || "");
        $rootScope.base.showPopup = true;
    }
    $rootScope.hidePopup = function () {
        $rootScope.base.showPopup = false;
    }
    $rootScope.popup('1', '目前没有会员申请互助我们希望您看到的永远是这条消息');
    rootscope = $rootScope
}]);





function init_pay(mydata,callback){
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId" : BASE.pay_appid,     //公众号名称，由商户传入
            "timeStamp":mydata.timeStamp,        //时间戳，自1970年以来的秒数
            "nonceStr" : mydata.nonceStr, //随机串
            "package" : mydata.package,
            "signType" : "MD5",         //微信签名方式:
            "paySign" :  mydata.paySign //微信签名
        },
        function(res){
            rootscope.hideLoading();
            if(res.err_msg == "get_brand_wcpay_request:ok" ) {
                callback();
            }

        }
    );
}
var rootscope;
function showJson(data) {
    console.log(JSON.stringify(data))
};

window.onload = function () {
    document.documentElement.style.webkitTouchCallout = 'none';
};

//var rolaxRandom
var init_animation = {
    is_start:false,
    init:function(){
        var obj = this;
        setTimeout(function(){
            if(!obj.is_start){
                obj.start();
                obj.is_start = true;
            }
        },2000);
    },
    start:function(){
        var rolasIndex;
        var obj = this;
        setTimeout(function(){
            rolasIndex= random(0,3);
            obj.animation(rolasIndex);
            obj.start();
        },2000);
    },animation:function(index){

        if(angular.element(document.querySelectorAll('._flip')[index]).hasClass('on_flip')){
            angular.element(document.querySelectorAll('._flip')[index]).removeClass('on_flip');
        }else{
            angular.element(document.querySelectorAll('._flip')[index]).addClass('on_flip');
        }
    }
}

init_animation.init();