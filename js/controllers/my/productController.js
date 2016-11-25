"use strict";
demoApp.controller('productController', ['$scope','$rootScope','$timeout','httpService',function ($scope,$rootScope,$timeout,httpService) {

    $scope.goToFly = function () {
        httpService.post(BASE.URL + 'user/findBaseInfo.json', '', {user_id:getOpenId()}).success(function (data) {
          //var  alter_base_id

            window.location.href = 'http://www.lovelynz.com/latefly/views/index.php?alter_base_id='+JSON.stringify(data.id);
        });
    }



}]);