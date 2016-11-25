"use strict";
demoApp.controller('addAppPlanController', ['$scope','httpService','$rootScope','$location','$timeout',function ($scope,httpService,$rootScope,$location,$timeout) {
    $scope.is_show_role=false;
    $scope.mobile=false;

    $scope.back_to_main = function(){
        history.back();
    }

    $scope.model = {};
    var model = localStorage.getItem("userInfo");
    if(model){
        $scope.model = JSON.parse(model);
    }

    //微信调用支付
    rootscope = $rootScope;
    $scope.pay = function($event){
        if(document.getElementById('checks').checked!=true){
            $rootScope.showPopup('请先阅读并同意《1717帮帮规》')
            return;
        }
        $event.stopPropagation();
        $event.preventDefault();

        httpService.post(BASE.URL+'payment/getAPPWXPayPrepayid.json','',{user_id:getOpenId(),total_fee:0.01,type:"recharge",flag:'pay_type'}).success(function(data){
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
                    httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
                        if(data.user_status){
                            localStorage.setItem("userInfo",JSON.stringify(data));
                        }
                        $rootScope.moveTo('addMyInfo');
                        window.location.replace('redirect.html');
                    });
                }, function (reason) {
                });
            }
        })

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

    var index = 60;
    $scope.countDown = function(){
        if(index!=0){
            $scope.time = index;
            index--;
            $timeout(function(){
                $scope.countDown();
            },1000)
        }else{
            $scope.time="重新发送"
        }
    }


}]);
