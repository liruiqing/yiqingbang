"use strict";
demoApp.controller('eventInfoController', ['$scope','httpService','$routeParams','$rootScope','$timeout',function ($scope,httpService,$routeParams,$rootScope,$timeout) {
    $scope.currentstatus=$routeParams.currentstatus;//event获取到的
    $scope.current_status=$routeParams.current_status;//helpevents获取到的
    $scope.event_id = $routeParams.event_id;
    $scope.event_track_id = $routeParams.event_track_id;

    httpService.post(BASE.URL+'event/eventDetail.json','',{event_id:$scope.event_id,pageNo:0,pageSize:10}).success(function(data){
        $scope.model = data;
    })

    $scope.support =function(){
      httpService.post(BASE.URL+'event/supportEvent.json','',{event_id:$scope.event_id,user_id:getUserId()}).success(function(data){
            $rootScope.showPopup(data.resultMessage);
            $timeout(function(){
                httpService.post(BASE.URL+'event/eventDetail.json','',{event_id:$scope.event_id,pageNo:0,pageSize:10}).success(function(data){
                    $scope.model = data;
                    $scope.$apply();
                })
            },1500);
        }).error(function(data){
        });
    };
}]);