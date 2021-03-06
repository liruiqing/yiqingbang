"use strict";
demoApp.controller('addPlanController', ['$scope','httpService','$rootScope','$location','$timeout',function ($scope,httpService,$rootScope,$location,$timeout) {
    var code = request('code');

    $scope.back_to_main = function(){
        window.location.href =  BASE.MAIN;
    }
    if(!code){
        window.location.replace(BASE.MAIN);
        return;
    }

    $scope.model = {};
    var model = localStorage.getItem("userInfo");
    if(model){
        $scope.model = JSON.parse(model);
    }
    if(/addPlan/.test(request('state'))){
    }
    if((request('state').replace('#/addPlan',''))=='get_pay_open_id'){
        httpService.post(BASE.URL+'payment/getNeWXOpenid.json','',{user_id: getOpenId(),code:code}).success(function(data){
            localStorage.setItem("userInfo",JSON.stringify(data));
            if(is_weixin()){
                $scope.pay();

            }{
                $scope.AppPay();
            }
        });
    }else{
        var shareOpenId = request('state');

        if(is_weixin()){
            if(shareOpenId){
                shareOpenId= shareOpenId.replace('#/addPlan','');
                shareOpenId= shareOpenId.replace('#wechat_redirect','');
                shareOpenId= shareOpenId.replace('from-main','');
                if(/share_openid/.test(shareOpenId)){
                    shareOpenId= shareOpenId.replace('share_openid','');
                    var obj = {code:code,shareOpenId:shareOpenId,type: 'RELATION_SHARE_FRIEND_AUTHORIZE',flag:'WX'};
                }else{
                    var obj = {code:code,shareOpenId:shareOpenId,flag:'WX'};
                }
            }else{
                var obj = {code:code,shareOpenId:shareOpenId,flag:'WX'};
            }

        }else{
            if(shareOpenId){
                shareOpenId= shareOpenId.replace('#/addPlan','');
                shareOpenId= shareOpenId.replace('#wechat_redirect','');
                shareOpenId= shareOpenId.replace('from-main','');
                if(/share_openid/.test(shareOpenId)){
                    shareOpenId= shareOpenId.replace('share_openid','');
                    var obj = {code:code,shareOpenId:shareOpenId,type: 'RELATION_SHARE_FRIEND_AUTHORIZE',flag:'APP'};
                }else{
                    var obj = {code:code,shareOpenId:shareOpenId,flag:'APP'};
                }
            }else{
                var obj = {code:code,shareOpenId:shareOpenId,flag:'APP'};
            }
        }
        httpService.post(BASE.URL+'payment/getWXOpenid.json','',obj).success(function(data){
            $rootScope.hideLoading();
            $scope.model = data;
            localStorage.setItem("userInfo",JSON.stringify(data));
            if(/from-main/.test( request('state'))){
                //window.location.href =BASE.BASE+'#/main';
                //rootscope.moveTo("main");
                window.location.replace(BASE.BASE+'#/main')
                return;
            }

            if(data.user_status==1||data.user_status==2||data.user_status==3||data.user_status==4||data.user_status==5){
                $rootScope.showPopup('您已经登录成功！');
                $timeout(function(){
                    $rootScope.hidePopup();
                    //rootscope.moveTo("main");
                    window.location.replace(BASE.BASE+'#/main')
                },1500);
            }
        });
    }

    //微信调用支付
    rootscope = $rootScope;
    $scope.pay = function($event){
        if(document.getElementById('checks').checked!=true){
            $rootScope.showPopup('请先阅读并同意《1717帮帮规》')
            return;
        }
        if(!getPayOpenid()){
            window.location.href = 'weixin_pay.html?state=get_pay_open_id';
            return;
        }
            rootscope.showLoading();
                httpService.post(BASE.URL+'payment/getWXPayPrepayid.json','',{user_id:getOpenId(),pay_openId:getPayOpenid(),total_fee:0.01,type:"recharge",flag:'pay_type'}).success(function(data){
                    rootscope.hideLoading();
                    init_pay(data,function(){
                        httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
                            if(data.user_status){
                                localStorage.setItem("userInfo",JSON.stringify(data));
                            }
                            window.location.replace('redirect.html');
                        });
                    });
                }).error(function(){
                    $rootScope.hideLoading();
                });
            $event.stopPropagation();
            $event.preventDefault();
    }

    //app调用支付
    $scope.AppPay = function($event){
        if(document.getElementById('checks').checked!=true){
            $rootScope.showPopup('请先阅读并同意《1717帮帮规》')
            return;
        }
        if(data.returnCode=="SUCCESS"){
            var obj = data;
            var params = {
                mch_id: '1254498901', // merchant id
                prepay_id: obj.prepay_id, // prepay id returned from server
                nonce: obj.nonceStr, // nonce string returned from server
                timestamp: obj.timeStamp, // timestamp
                sign: obj.paySign, // signed string
            };

            Wechat.sendPaymentRequest(params, function () {
                rootscope.showLoading();
                httpService.post(BASE.URL+'payment/getAPPWXPayPrepayid.json','',{user_id:getOpenId(),total_fee:0.01,type:"recharge",flag:'pay_type'}).success(function(data){
                    rootscope.hideLoading();
                    init_pay(data,function(){
                        httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
                            if(data.user_status){
                                localStorage.setItem("userInfo",JSON.stringify(data));
                            }
                            window.location.replace('redirect.html');
                        });
                    });
                }).error(function(){
                    $rootScope.hideLoading();
                });
                $event.stopPropagation();
                $event.preventDefault();
            }, function (reasonreason) {
            });
        }
    }




    //手机好娇艳


    $scope.time="发送验证码";
    $scope.sendMsg = function(){
        if($scope.phone==''){
            $rootScope.showPopup('手机号不能为空！');
            return;
        }
        if(!isMobile($scope.phone)){
            $rootScope.showPopup('手机号格式错误！');
            return;
        }

        $rootScope.showLoading();
        httpService.post(BASE.URL+'sendmessage/checkIsJoin.json','',{phone:$scope.phone}).success(function(data){
            if(data.result=='error'){
                $rootScope.showPopup(data.toalert);
                $rootScope.hideLoading();
                return;
            }
            else if(data.result=='success'){
                httpService.post(BASE.URL+'sendmessage/sendmessage.json','',{phone:$scope.phone,flag:'angel'}).success(function(data){
                    $rootScope.hideLoading();
                    $rootScope.showPopup('验证码已发送！');
                    $scope.countDown();

                });

            }
            $rootScope.hideLoading();

        });
    }

    $scope.login = function() {
        if ($scope.phone == '') {
            $rootScope.showPopup('手机号不能为空！');
            return;
        }
        if (!isMobile($scope.phone)) {
            $rootScope.showPopup('手机号格式错误！');
            return;
        }
        if (!isCode($scope.identify_code)) {
            $rootScope.showPopup('验证码错误！');
            return;
        }
        httpService.post(BASE.URL+'sendmessage/checkIsJoin.json','',{phone:$scope.phone}).success(function(data){
            if(data.result=='error'){
                $rootScope.showPopup(data.toalert);
                //$rootScope.hideLoading();
                return;
            }else if(data.result=='success'){
                //$rootScope.showLoading();
                httpService.post(BASE.URL + 'sendmessage/checkCode.json', '', {phone: $scope.phone,identify_code:$scope.identify_code,flag:'angel'}).success(function (data) {
                    if (data.result == 'error') {
                        $rootScope.showPopup(data.toalert);
                    }else{
                        httpService.post(BASE.URL + 'user/queryAndDeleteUser.json', '', {phone: $scope.phone,user_id:getOpenId()}).success(function (data) {
                           $timeout(function(){
                               window.location.href = "http://www.lovelynz.com/1717/web/#/main"
                           },100)

                            localStorage.clear('userInfo');
                            localStorage.setItem('userInfo',JSON.stringify(data));

                        });

                    }
                    $rootScope.hideLoading();
                });
            }

        });


    }
}]);