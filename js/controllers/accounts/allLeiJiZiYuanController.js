"use strict";

demoApp.controller('allLeiJiZiYuanController', ['$scope','httpService','$rootScope','$timeout',function ($scope,httpService,$rootScope,$timeout) {

    $scope.pageNo  = 0;
    $scope.model = [];
    httpService.post(BASE.URL+'platform/platAccount.json ','','').success(function(data){
        $scope.all_cost = data.allmoney+data.volun_donate_money;
    })

    $scope.getMore = function(){
        httpService.post(BASE.URL+'platform/findAllMoneyList.json','',{pageNo:$scope.pageNo,pageSize:10}).success(function(data){
            show_log(data);
            if(data.length==0){
                $scope.showPopup("没有更多了");
                return;
            }
            $scope.pageNo++;
            $scope.model = data;
        })
    }
    $scope.getMore();
}]);

