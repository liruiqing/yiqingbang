"use strict";

demoApp.controller('juanZhuController', ['$scope','$rootScope','$routeParams','httpService',function ($scope,$rootScope,$routeParams,httpService) {

    var event_id =  $routeParams.id;
    $scope.currentstatus=request('currentstatus');
    $scope.event_id=request('event_id');
    $scope.event_track_id=request('event_track_id');
    $scope.isLogin = true;
    $rootScope.reaseMoney=$scope.donate_fee;
    $scope.model= {openId:getOpenId(),total_fee:$scope.donate_fee,event_id: request('event_id'),type:"donate",flag:'pay_type'};
    $scope.money_raised=$rootScope.money_raised;
    $scope.demand_money=$rootScope.demand_money;
    $scope.pay = function($event){
        rootscope = $rootScope;

           if(($rootScope.demand_money-$rootScope.money_raised)<0){
               alert('自愿捐助金额已满')
               return;
           }
           if($scope.donate_fee==''||$scope.donate_fee==null||$scope.donate_fee<=0){
               $scope.showPopup("请输入正确的金额");
               return;
           }
           rootscope.showLoading();
           rootscope.reaseMoney=$scope.donate_fee;
        if(is_weixin()){
           httpService.post(BASE.URL+'payment/getWXPayPrepayid.json','',{user_id:getOpenId(),pay_openId:getPayOpenid(),total_fee:$scope.donate_fee,event_id: request('event_id'),event_track_id:request('event_track_id'),type:"donate",flag:'pay_type'}).success(function(data){
               rootscope.hideLoading();
               init_pay(data,function(){
                   rootscope.moveTo('certificate');
                   rootscope.$apply();
               });
           });
           $event.preventDefault();
           $event.stopPropagation();

       }else{

           httpService.post(BASE.URL+'payment/getAPPWXPayPrepayid.json','',{user_id:getOpenId(),total_fee:0.01,type:"recharge",flag:'pay_type'}).success(function(data) {
               rootscope.hideLoading();

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
                       rootscope.moveTo('certificate');
                       rootscope.$apply();
                       $event.preventDefault();
                       $event.stopPropagation();


                   }, function (reasonreason) {
                   });
               }

           })



       }
    }

    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
        if (data.user_status == 0 || data.user_status == '' || data.user_status == null) {
                    document.getElementById('isevent1').style.display = 'block'
                }
    });
    $scope.goLastPage = function(){
    history.back(-1);
    }
}]);