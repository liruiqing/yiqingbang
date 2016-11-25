"use strict";

demoApp.controller('helpEventsController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    if(localStorage.getItem('attention')){
        document.getElementById('remind2').style.display="block";
    }else{
        httpService.post(BASE.URL+'event/findEvent.json','',{pageNo:0,pageSize:10}).success(function(data){
            if(data==null||data==''){
                $rootScope.showPopup('暂时没有事件发生，先看看别处吧')
            }else{
                $scope.model = data;
            }
            $rootScope.loading("hide")
        }).error(function(data){
            $rootScope.loading("hide")
        });
    }

 $scope.showPop1 = function () {
     document.getElementById('remind2').style.display="none";
     httpService.post(BASE.URL+'event/findEvent.json','',{pageNo:0,pageSize:10}).success(function(data){
         if(data==null||data==''){
             $rootScope.showPopup('暂时没有事件发生，先看看别处吧')
         }else{
             $scope.model = data;
         }
         $rootScope.loading("hide")
     }).error(function(data){
         $rootScope.loading("hide")
     });
 }
    /*                    判断是否录入子女信息             */
    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
        if(data.user_status==0||data.user_status==''||data.user_status==null){
            return;
        }else if(data.user_status==3||data.user_status==4){
            httpService.post(BASE.URL+'user/findUserinfo.json','',{user_id:getOpenId()}).success(function(data){
                if((data.childsInfo==''||data.childsInfo==null)&&!localStorage.getItem('hideChildsInfo',true)){
                    document.getElementById('showChildInfo6').style.display="block";
                }
            })
        }
    });

    $scope.hideChild = function(){
        if(document.getElementById('childInfo6').checked==true){
            localStorage.setItem('hideChildsInfo',true)
            document.getElementById('showChildInfo6').style.display="none";
        }else{
            document.getElementById('showChildInfo6').style.display="none";
        }
    }

    $scope.showPop = function (){

    }
}]);

