"use strict";

demoApp.controller('allAccountController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    httpService.post(BASE.URL+'event/findSumDonateMoneyAndSupportNo.json','',{pageNo:0,pageSize:10}).success(function(data){
        $scope.model = data;
    }).error(function(data){
    });
}]);

