"use strict";

demoApp.controller('myMessageController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {
    $scope.init =function(){
        httpService.post(BASE.URL+'user/message_info.json','',{user_id:getUserId(),pageNo:0,pageSize:20}).success(function(data){
            $scope.model = data;
        })
    }
    $scope.init();
    httpService.post(BASE.URL+'user/message_allreadyRead.json','',{user_id:getUserId()}).success(function(data){
    })

    $scope.deleteMsg = function(id){
        httpService.post(BASE.URL+'user/message_invalid.json','',{id:id}).success(function(data){
            if(data.result=='success'){
                $rootScope.popup("show",'删除成功');
                $timeout(function(){
                    $scope.init();
                    $rootScope.popup("hide");
                },1000);
            }
        }).error(function(){
        });
    }
}]);

