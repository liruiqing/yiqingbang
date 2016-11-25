"use strict";

demoApp.controller('certificateController', ['$scope','httpService','$routeParams','$rootScope',function ($scope,httpService,$routeParams,$rootScope) {

    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
        $scope.model=data;
    });

    var date = new Date()
    var newdate=date.getTime();
    $scope.nowtime=newdate;
}]);