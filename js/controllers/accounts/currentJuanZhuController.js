/*****************************   new  change   *********************************************/
"use strict";

demoApp.controller('currentJuanZhuController', ['$scope','httpService','$rootScope','$timeout',function ($scope,httpService,$rootScope,$timeout) {
    httpService.post(BASE.URL+'platform/donateVoluntary.json','',{pageNo:0,pageSize:10}).success(function(data){
        $scope.model = data;
        showJson(data);
    }).error(function(data){
    });

    $scope.showmyPosition=function(){
        document.getElementById('myposition').style.display="block";
        $timeout(function(){
            document.getElementById('myposition').style.right="9px";
            document.getElementById('myposition').style.transition="0.5s";
        },100)
    }
/*   改    */
    httpService.post(BASE.URL+'platform/findMyPositionList.json','',{user_id:getUserId()}).success(function(data){
        localStorage.setItem('order_id_list',JSON.stringify(data.myPositionList));
    }).error(function(data){
    });

    var timesMyWeiZhi=0
    $scope.goMyWeiZhi1 = function (){

        var gid=getUserId()
        //var times=0
        if(gid==false){
            gid=0
        }
        var order_id_list  =localStorage.getItem('order_id_list');
        if(order_id_list){
            var order_id_obj =  JSON.parse(order_id_list);
            var order_id_list_length =  order_id_obj.length;
        }else{
            alert('暂时没有找到您的位置')
            return;
        }
        httpService.post(BASE.URL+'platform/findMyPlatformPosition.json','',{user_id:gid,order_id:order_id_obj[timesMyWeiZhi].order_id}).success(function(data){
            if(data==''||data==null){
                $rootScope.showPopup('暂时找不到您的位置')
            }else{
                $scope.model = data.donateOrderList
            }
            if(timesMyWeiZhi<order_id_list_length-1){
                timesMyWeiZhi++;
            }else{
                timesMyWeiZhi=0;
            }
        }).error(function(data){
        });
    }

    $scope.reloading = function(){
        httpService.post(BASE.URL+'platform/donateVoluntary.json','',{pageNo:0,pageSize:10}).success(function(data){
            $scope.model = data;
            showJson(data);
        }).error(function(data){
        });
    }
}]);