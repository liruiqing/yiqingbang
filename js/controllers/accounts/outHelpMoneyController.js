"use strict";

demoApp.controller('outHelpMoneyController', ['$scope','httpService','$rootScope','$timeout',function ($scope,httpService,$rootScope,$timeout) {

    $scope.pageNo  = 0;
    $scope.model = [];

    httpService.post(BASE.URL+'platform/platAccount.json ','','').success(function(data){
        $scope.total_cost = data.total_cost;
    })

    $scope.getMore = function(){
        httpService.post(BASE.URL+'platform/findDutyDonateMoneyList.json','',{pageNo:$scope.pageNo,pageSize:20}).success(function(data){
            if(data.length==0){
                $scope.showPopup("没有更多了");
                return;
            }
            $scope.pageNo++;
            $scope.model = data;
        })
    }
    $scope.getMore();

    $scope.inputFocus = function(){
        $timeout(function(){
            window.scrollTop= 1000+'px';
        },300);
    }

    $scope.goBottom= function (){
        var h = window.innerHeight
        h = h-90;
        document.getElementById('hight1').style.height=h+'px';
    }
    $scope.goBottom();

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
            httpService.post(BASE.URL+'platform/newFindMyPositionP.json','',{id:gid,flag:'GO',pageNo:$scope.gonum}).success(function(data){
                if(data==''||data==null){
                    $rootScope.showPopup('暂时没有这么多流水')
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

    $scope.slideToTop1 = function(){
        $timeout(function(){
            document.getElementById('slide').scrollTop=1000
        },1000);
    }

    $scope.goMydeWeiZhi = function (){
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
                if(data.UserVo==''||data.UserVo==null){
                    $rootScope.showPopup('暂时没有这么多流水')
                    return;
                }
                $scope.model=data.UserVo;
            }).error(function(data){
            });
        }else{
            $rootScope.showPopup("请输入正确的数字")
            return;
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