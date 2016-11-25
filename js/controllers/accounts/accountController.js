"use strict";

demoApp.controller('accountController', ['$scope','$rootScope','$timeout','httpService','common','$location',function ($scope,$rootScope,$timeout,httpService,common,$location) {
    $scope.model = {profit:false};
    if(localStorage.getItem('attention')){
        $rootScope.showPopup("请关注1717帮！");
    }
    httpService.post(BASE.URL+'platform/platAccount.json ','','').success(function(data){
        //console.log(JSON.stringify(data));
        $scope.model = data;
        $rootScope.rootModel.total=data;
    })

    httpService.post(BASE.URL+'platform/platAccountX.json','',{user_id:getUserId()}).success(function(data){
        $scope.sunDV = data;
        if(getUserStatus()==3||getUserStatus()==4){
        }else{
            $scope.sunDV.sumDT = 0;
        }
    })
/*                    判断是否录入子女信息             */
    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
        $scope.my_status = data.user_status
        if(data.user_status==0||data.user_status==''||data.user_status==null){
            return;
        }else if(data.user_status==3||data.user_status==4){
            httpService.post(BASE.URL+'user/findUserinfo.json','',{user_id:getOpenId()}).success(function(data){
                if((data.childsInfo==''||data.childsInfo==null)&&!localStorage.getItem('hideChildsInfo',true)){
                    document.getElementById('showChildInfo5').style.display="block";
                }
            })
        }
    });

    $scope.hideChild = function(){
        if(document.getElementById('childInfo5').checked==true){
            localStorage.setItem('hideChildsInfo',true)
            document.getElementById('showChildInfo5').style.display="none";
        }else{
            document.getElementById('showChildInfo5').style.display="none";
        }
    }

    $scope.jumpTo = function(){
        if($scope.my_status==0||$scope.my_status==''||$scope.my_status==null){
            return;
        }else{
            $location.path('friends');
        }
    }
}]);