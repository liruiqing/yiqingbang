"use strict";

demoApp.controller('rechargeController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    $scope.pay = function(){
        $rootScope.showLoading();
        rootscope = $rootScope;
       if(is_weixin()){
           httpService.post(BASE.URL+'payment/getWXPayPrepayid.json','',{user_id:getOpenId(),pay_openId:getPayOpenid(),total_fee:9,type:"recharge",flag:'pay_type'}).success(function(data){
               $rootScope.hideLoading();
               init_pay(data,function(){
                   rootscope.moveTo('my');
                   rootscope.$apply();
               });
           });
       }else{
           httpService.post(BASE.URL+'payment/getAPPWXPayPrepayid.json','',{user_id:getOpenId(),total_fee:0.01,type:"recharge",flag:'pay_type'}).success(function(data){
               $rootScope.hideLoading();

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
                       //rootscope.showLoading();
                       rootscope.moveTo('my');
                       rootscope.$apply();
                   }, function (reasonreason) {
                   });
               }
           })

       }


    }
}]);
