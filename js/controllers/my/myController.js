"use strict";

demoApp.controller('myController', ['$scope','$rootScope','$timeout','httpService','common','$location',function ($scope,$rootScope,$timeout,httpService,common,$location) {
    $scope.model = {};

    if(localStorage.getItem('attention')){
        $rootScope.showPopup("请关注1717帮！");
    }
    if(getUserId()){
        httpService.post(BASE.URL+'user/findUserBalaAndDon.json','',{id: getUserId()}).success(function(data){
            $scope.model = data;
            $rootScope.rootModel = data;
        });
    }


    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
        if (data.user_status == 0 || data.user_status == '' || data.user_status == null) {
            document.getElementById('isadd').style.display = 'block'
        }
       else if(data.user_status ==3 || data.user_status == 4||data.user_status == 2){
                httpService.post(BASE.URL+'user/findUserinfo.json','',{user_id:getOpenId()}).success(function(data){
                    if((data.childsInfo==''||data.childsInfo==null)&&!localStorage.getItem('hideChildsInfo',true)){
                        document.getElementById('showChildInfo4').style.display="block";
                    }
                })
            //if(localStorage.getItem('attention')){
            //    $rootScope.showPopup("���ע1717�")
            //}
            return;
        }
        //else{
        //    if(localStorage.getItem('attention')){
        //        $rootScope.showPopup("���ע1717�")
        //    }
        //}
    });

    $scope.hideChild = function(){
        if(document.getElementById('childInfo4').checked==true){
            localStorage.setItem('hideChildsInfo',true)
            document.getElementById('showChildInfo4').style.display="none";
        }else{
            document.getElementById('showChildInfo4').style.display="none";
        }
    }

    $scope.goLastPage = function(){
        history.back(-1)
    }

    httpService.post(BASE.URL+'user/message_info.json','',{user_id:getUserId(),pageNo:0,pageSize:10}).success(function(data){
        $scope.messageNum = data.length;
    }).error(function(data){
    });
}]);