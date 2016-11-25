"use strict";

demoApp.controller('loveController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    $scope.model = [];


    if(localStorage.getItem('attention')){
       document.getElementById('remind1').style.display="block";
    }else{
        httpService.post(BASE.URL+'event/eventLover.json','',{pageNo:0,pageSize:10}).success(function(data){
            console.log(JSON.stringify(data));
            if(data==null||data==''){
                $rootScope.showPopup('暂时没有正在捐助的事件')
            }else{
                $scope.model = data;
            }
        }).error(function(data){
        });
    }

    $scope.showPop = function () {
        document.getElementById('remind1').style.display="none";
        httpService.post(BASE.URL+'event/eventLover.json','',{pageNo:0,pageSize:10}).success(function(data){
            console.log(JSON.stringify(data));
            if(data==null||data==''){
                $rootScope.showPopup('暂时没有正在捐助的事件')
            }else{
                $scope.model = data;
            }
        }).error(function(data){
        });
    }

    if($scope.model.length = 0){
        $rootScope.base.showNotice=true
    }else{
        $rootScope.base.showNotice=false
    }

    $scope.moveToInfo = function (event_id) {
        httpService.post(BASE.URL+'event/eventDetail.json','',{event_id:event_id,pageNo:0,pageSize:10}).success(function(data){
            $scope.model = data;
            moveTo('eventInfo/'+item.event_id+'/'+item.currentstatus)
        }).error(function(data){
        });
    }

    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
        if(data.user_status==0||data.user_status==''||data.user_status==null){
            return;
        }else if(data.user_status==3||data.user_status==4){
            httpService.post(BASE.URL+'user/findUserinfo.json','',{user_id:getOpenId()}).success(function(data){
                if((data.childsInfo==''||data.childsInfo==null)&&!localStorage.getItem('hideChildsInfo',true)){
                    document.getElementById('showChildInfo2').style.display="block";
                }
            })
        }
    });

    $scope.hideChild = function(){
        if(document.getElementById('childInfo2').checked==true){
            localStorage.setItem('hideChildsInfo',true)
            document.getElementById('showChildInfo2').style.display="none";
        }else{
            document.getElementById('showChildInfo2').style.display="none";
        }
    }
}]);