"use strict";

demoApp.controller('eventController', ['$scope','$rootScope','httpService','$routeParams','$timeout','$location',function ($scope,$rootScope,httpService,$routeParams,$timeout,$location) {

    var event_id =  $routeParams.id;
    var current_status= $routeParams.current_status;
    $scope.current_status=current_status;
    $scope.event_id = event_id;
    $scope.event_track_id = 0;
    $scope.model={}
    $scope.model1={};
    $scope.model2={};
    $scope.setModel = function (obj) {
       $rootScope.rootModel = obj;
       $rootScope.rootModel.event_id=event_id;
    }

    httpService.post(BASE.URL+'event/eventDetail.json','',{event_id:event_id,pageNo:0,pageSize:100}).success(function(data){
        $scope.model = data;
        for(var i= 0,len=data.length;i<len;i++){
            if(data[i].currentstatus ==1){
                $scope.event_track_id =  data[i].event_track_id;
            }
        }

        for(var i= 0,len=data.length;i<len;i++){
            if(data[i].currentstatus ==1){
                $rootScope.demand_money =  data[i].demand_money;
                $rootScope.money_raised =  data[i].money_raised;
                $rootScope.img_url =  data[i].img_url;
                $rootScope.current_content =  data[i].current_content;
            }
        }
    })

    httpService.post(BASE.URL+'event/findDonateList.json','',{event_id:event_id,pageNo:0,pageSize:10}).success(function(data){
        $scope.model1 = data;
    }).error(function(data){
    });

    httpService.post(BASE.URL+'event/findContributeInfo.json','',{event_id:event_id,user_id:getUserId(),event_track_id:1}).success(function(data){
        $scope.model2 = data;
    }).error(function(data){
    });

$scope.support = function(){
    httpService.post(BASE.URL+'event/supportEvent.json','',{event_id:event_id,user_id:getUserId()}).success(function(data){
            $rootScope.showPopup(data.resultMessage);
            $timeout(function(){
                httpService.post(BASE.URL+'event/eventDetail.json','',{event_id:event_id,pageNo:0,pageSize:10}).success(function(data){
                    $scope.model = data;
                    $scope.$apply();
                })
            },1500);
    }).error(function(data){
    });
  };
    $scope.findMe = function(){
        httpService.post(BASE.URL+'event/findMe.json','',{user_id:getUserId(),event_id:event_id,flag:'NORMAL'}).success(function(data) {
           if(data==''||data==null) {
                $rootScope.showPopup('自愿捐助后即可查看您的位置')
            }else{
            $scope.model1=data;}
        }).error(function(data){
        });
    }
    httpService.post(BASE.URL+'event/showEventDetail.json','',{event_id:event_id}).success(function(data){
        $scope.picAndText=data
    })
    $scope.showmyPosition=function(){
        document.getElementById('myposition').style.right="9px";
        document.getElementById('myposition').style.transition="0.5s";
    }

    var ifHide=1
    $scope.isFold = function($event){
        if(ifHide==1){
            document.getElementById('fold').style.height="250px"
            document.getElementById('isHideFold').innerHTML="点击收起︽";
            document.getElementById('isHideFold').id='isFold';
            ifHide=0
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }
        if(ifHide==0){
            document.getElementById('fold').style.height="80px"
            document.getElementById('isFold').innerHTML="点击展开︾"
            document.getElementById('isFold').id='isHideFold';
            ifHide=1
            $event.stopPropagation();
            $event.preventDefault();
            return;
        }
    }

    httpService.post(BASE.URL+'platform/newTotal.json','','').success(function(data){
        $scope.allmoney = data.allmoney;
    });
    $scope.reloading = function () {
        httpService.post(BASE.URL+'event/findDonateList.json','',{event_id:event_id,pageNo:0,pageSize:10}).success(function(data){
            $scope.model1 = data;
        }).error(function(data){
        });
    }

    $scope.reloadData = function(){
        httpService.post(BASE.URL+'event/findContributeInfo.json','',{event_id:event_id,user_id:getUserId(),event_track_id:1}).success(function(data){
            $scope.model2 = data;
        }).error(function(data){
        });
    }
}]);