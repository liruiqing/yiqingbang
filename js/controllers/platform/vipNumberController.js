"use strict";

demoApp.controller('vipNumberController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {
    $scope.total = JSON.parse(localStorage.getItem("total"));
    $scope.pageNo  = 0;
    $scope.model = [];
    $scope.gonum=''
        $scope.getMore = function(){
        httpService.post(BASE.URL+'platform/findAllMembers.json','',{pageNo:$scope.pageNo,pageSize:10}).success(function(data){
            if(data.length==0){
                $scope.showPopup("没有更多了");
                return;
        }
            $scope.pageNo++;
            $scope.model = data;
        })
    }

    $scope.inputFocus = function(){
        $timeout(function(){
            window.scrollTop= 1000+'px';
        },300);
    }
    $scope.getMore();

    $scope.goBottom= function (){
        var h = window.innerHeight
        h = h-90;
        document.getElementById('hig').style.height=h+'px';
    }

    $scope.goBottom();

    $scope.goMyPosition = function (){
        var gid=getUserId()
        if(gid==false){
            gid=0
        }
        httpService.post(BASE.URL+'platform/findMyPosition.json','',{id:gid,flag:'POSITION',pageNo:0}).success(function(data){
            if(data==''||data==null){
                if($scope.myStatus.user_status==2){
                    $rootScope.showPopup("分享朋友圈后才算加入计划哦")
                }else{
                    document.getElementById('myweizhi').style.display="block"
                }
                return;
            }{
                $scope.model=data;
            }
        }).error(function(data){
        });
    }

    $scope.goAnyPosition = function (){
        var gid=getUserId()
        if(gid==false){
            gid=0
        }
        if($scope.gonum==''||$scope.gonum==null){
            $rootScope.showPopup('请输入页码')
            return;
        }
        if(!isNaN($scope.gonum&&$scope.gonum!=0)){
        httpService.post(BASE.URL+'platform/findMyPosition.json','',{id:gid,flag:'GO',pageNo:$scope.gonum}).success(function(data){
            if(data==''||data==null){
                $rootScope.showPopup('暂时没有这么多会员')
                return;
            }
            $scope.model=data;
        }).error(function(data){
        });
        }else{
            $rootScope.showPopup("请输入正确的页码数")
            return;
        }
    }

    $scope.slideToTop = function(){
$timeout(function(){
    document.getElementById('slide').scrollTop;
},1000)
    }

    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
            $scope.myStatus=data
    });

    $scope.goAddPlan = function(){
        if(is_weixin()){
            window.location.href = 'weixin.html?state=0';
        }
    }

    $scope.inputFocus = function(){
        $timeout(function(){
            angular.element(document.documentElement).addClass('trans_time');
            angular.element(document.body).addClass('trans_time');
            document.documentElement.scrollTop = 1000;
            document.body.scrollTop = 1000;
        },50);
    }
}]);