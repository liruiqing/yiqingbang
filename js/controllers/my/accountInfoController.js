"use strict";

demoApp.controller('accountInfoController', ['$scope','$timeout','httpService',function ($scope,$timeout,httpService) {

    $scope.model1 = {};
    $scope.accountMoney = {};
    if(getUserId()){
        httpService.post(BASE.URL+'user/descAccountDetail.json','',{user_id:getUserId(),time:'2015',pageNo:0,pageSize:100}).success(function(data){
            $scope.model1= data.userOperateRecord;
            $scope.totalMoney = data.accountMoney.totalMoney;
        })
       httpService.post(BASE.URL+'user/descAccountIn.json','',{user_id:getUserId(),time:'2015',pageNo:0,pageSize:100}).success(function(data){
            $scope.model2 = data;
        });
        httpService.post(BASE.URL+'user/descAccountOut.json','',{user_id:getUserId(),time:'2015',pageNo:0,pageSize:100}).success(function(data){
            $scope.model3 = data;
        });
    }
    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
       $scope.isShare=data.is_share;
    });
}]);