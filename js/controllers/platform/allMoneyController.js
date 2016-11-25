"use strict";

demoApp.controller('allMoneyController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {
    $scope.peoples = [{imgUrl:'img/head.png',name:"XXX",time:'2015-2-28 17:42:32',userId:"+9元"},
        {imgUrl:'img/head.png',name:"XXX",time:'2015-2-28 17:42:32',userId:"+9元"},
        {imgUrl:'img/head.png',name:"XXX",time:'2015-2-28 17:42:32',userId:"+9元"},
        {imgUrl:'img/head.png',name:"XXX",time:'2015-2-28 17:42:32',userId:"+9元"},
        {imgUrl:'img/head.png',name:"XXX",time:'2015-2-28 17:42:32',userId:"+9元"}];

    httpService.post(BASE.URL+'platform/newTotal.json','','').success(function(data){
        $scope.allMoney = data.allmoney;
    });

    $scope.model = [];
    $scope.pageNo  = 0;

    $scope.getMore = function(){
        httpService.post(BASE.URL+'platform/findAllDonateMoney.json','',{pageNo:$scope.pageNo,pageSize:10}).success(function(data){
            if(data.UserVo.length==0){
                $scope.showPopup("没有更多了");
                return;
            }
            $scope.pageNo++;
            $scope.model = data.UserVo;
        })
    };

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
    var timesMyWeiZhi=0
    $scope.goMyPosition = function (){
        var gid=getUserId()
        if(gid==false){
            gid=0
        }
        httpService.post(BASE.URL+'platform/newFindMyPosition.json','',{id:gid,flag:'POSITION',pageNo:0,times:timesMyWeiZhi}).success(function(data){
           if(data.userList.length==''||data.userList.length==null){
               timesMyWeiZhi=0
               $scope.goMyPosition()
           }

            if(data.times<=data.userList.length){
                timesMyWeiZhi=data.times
                $scope.model=data.userList;
            }
        }).error(function(data){
        });
    }

/*--------------------go-----------------------*/
    var timesGo=0
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
            httpService.post(BASE.URL+'platform/newFindMyPositionP.json','',{id:gid,flag:'GO',pageNo:$scope.gonum,times:timesGo}).success(function(data){
                if(data==''||data==null){
                    $rootScope.showPopup('暂时没有这么多流水')
                    return;
                }
                if(data.times<data.length){
                    timesGo=data.times
                    $scope.model=data;
                }else{
                    timesGo=0
                    $scope.model=data;
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

    $scope.inputFocus = function(){
        $timeout(function(){
            angular.element(document.documentElement).addClass('trans_time');
            angular.element(document.body).addClass('trans_time');
            document.documentElement.scrollTop = 1000;
            document.body.scrollTop = 1000;
        },50);
    }
}]);