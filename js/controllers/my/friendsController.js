"use strict";

demoApp.controller('friendsController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    $rootScope.loading("hide");
    $rootScope.popup('hide');
    common.fun1();

    $scope.my_img =getImgUrl();
    httpService.post(BASE.URL+'platform/getMyfriend.json','',{user_id:getUserId(),pageNo:0,pageSize:1000}).success(function(data){
        $scope.model = data;
    }).error(function(data){
    });
    $scope.show_share = false;

    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
        if((data.total_money>0)&&(data.share_personl=='NOT_SHARE'||data.share_personl=='PLAT_FORM')){
            $scope.show_share = true;
        }else{
            $scope.show_share = false;
        }
    });
    var weixin_ready = false;
}]);
