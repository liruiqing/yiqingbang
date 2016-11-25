"use strict";

demoApp.controller('loveLetterController', ['$scope','$rootScope','$timeout','httpService','common','$routeParams',function ($scope,$rootScope,$timeout,httpService,common,$routeParams) {
    var event_id =  $routeParams.event_id;
    $scope.event_id = parseInt(event_id);

    httpService.post(BASE.URL+'platform/thanksLetter.json','',{event_id:$scope.event_id}).success(function(data){
        $scope.model=data;
    });
}]);
