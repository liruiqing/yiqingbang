"use strict";
demoApp.controller('weixinController', ['$scope','httpService',function ($scope,httpService) {
    var code = request('code');
    $scope.model = {};
    var shareOpenId = request('state');
    var obj = {};
    if(is_weixin()){
        obj = {code:code,shareOpenId:shareOpenId,flag:'WX'};
    }else{
        obj = {code:code,shareOpenId:shareOpenId,flag:'APP'};
    }
    if(shareOpenId){
        shareOpenId= shareOpenId.replace('#/addPlan','');
    }

    httpService.post(BASE.URL+'payment/getWXOpenid.json','',obj).success(function(data){
        $rootScope.hideLoading();
        $scope.model = data;
        localStorage.setItem("userInfo",JSON.stringify(data));
        window.location.replace('weixin.html');
    });
}]);