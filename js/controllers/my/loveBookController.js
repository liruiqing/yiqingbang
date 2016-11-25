"use strict";
demoApp.controller('loveBookController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    $scope.model = [];
    httpService.post(BASE.URL+'event/loveBook.json','',{user_id:getUserId(),pageNo:0,pageSize:10}).success(function(data){
        $scope.model = data;
    }).error(function(data){
    })

    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
        $scope.total_money=data;
    });

    $scope.isAdd = function(){
        if($scope.total_money.user_status==3||$scope.total_money.user_status==4){
            return true;
        }else{
            return false;
        }
    }
}]);