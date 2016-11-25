"use strict";

demoApp.controller('loginController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {

    $scope.phone = "18600187437";
    $scope.identify_code = "";
    $scope.time=$scope.time_content="发送验证码";
    $scope.sendMsg = function(){
        if($scope.phone==''){
            $rootScope.showPopup('手机号不能为空！');
            return;
        }
        if(!isMobile($scope.phone)){
            $rootScope.showPopup('手机号格式错误！');
            return;
        }

        $rootScope.showLoading();
        httpService.post(BASE.URL+'sendmessage/sendmessage.json','',{phone:$scope.phone}).success(function(data){
            if(data.result=='OK'){
                $rootScope.showPopup('验证码已发送！');
            }
            $rootScope.hideLoading();
        });
    }

    $scope.login = function() {
        if ($scope.phone == '') {
            $rootScope.showPopup('手机号不能为空！');
            return;
        }
        if (!isMobile($scope.phone)) {
            $rootScope.showPopup('手机号格式错误！');
            return;
        }
        if (!isCode($scope.identify_code)) {
            $rootScope.showPopup('验证码错误！');
            return;
        }
        $rootScope.showLoading();
        httpService.post(BASE.URL + 'sendmessage/checkCode.json', '', {phone: $scope.phone,identify_code:$scope.identify_code}).success(function (data) {
            if (data.result == 'error') {
                $rootScope.showPopup(data.toalert);
            }else{
                $rootScope.moveTo('main');
            }
            $rootScope.hideLoading();
        });
    }
}]);