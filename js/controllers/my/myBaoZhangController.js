"use strict";

demoApp.controller('myBaoZhangController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    $rootScope.loading("hide");
    $rootScope.popup('hide');
    common.fun1()
}]);