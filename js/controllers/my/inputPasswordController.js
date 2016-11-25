"use strict";

demoApp.controller('inputPasswordController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    $rootScope.loading("hide");
    $rootScope.popup('hide');
    common.fun1()
    httpService.post('api/user.php',{name:'liruiqing',age:28}).success(function(data){
    }).error(function(data){
    });
}]);