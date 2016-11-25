"use strict";

demoApp.controller('juanZhuBangController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    httpService.post(BASE.URL+'platform/platDonateRank.json','',{pageNo:0,pageSize:10}).success(function(data){
        $scope.model = data;
        showJson(data);
    }).error(function(data){
    });
    $scope.goMyWeiZhi1 = function (){
        var gid=getUserId()
        if(gid==false){
            gid=0
        }
        httpService.post(BASE.URL+'platform/findMyPosition.json','',{id:gid,flag:'DONATEPOSITION',pageNo:0}).success(function(data){
           if(data==''||data==null){
               $rootScope.showPopup('您暂时没有捐助')
               return;
           }{
                $scope.model=data;
            }
        }).error(function(data){
        });
    }

    $scope.showmyPosition=function(){
        document.getElementById('myposition1').style.display="block";
        $timeout(function(){
            document.getElementById('myposition1').style.right="9px";
            document.getElementById('myposition1').style.transition="0.5s";
        },100)
    }

    $scope.reloading = function(){
        httpService.post(BASE.URL+'platform/platDonateRank.json','',{pageNo:0,pageSize:10}).success(function(data){
            $scope.model = data;
            showJson(data);
        }).error(function(data){
        });
    }
}]);