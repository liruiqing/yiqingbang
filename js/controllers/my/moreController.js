"use strict";
demoApp.controller('moreController', ['$scope','$rootScope','$timeout',function ($scope,$rootScope,$timeout) {

    $scope.loginOut = function(){
       if(is_weixin()){
           localStorage.clear();
           sessionStorage.clear();
           $rootScope.showPopup('退出成功！')
           localStorage.setItem('isRefresh',1);
           $timeout(function(){
               window.location.replace(BASE.BASE+'#/main');
           },1000);
       }else{
           localStorage.clear();
           sessionStorage.clear();
           localStorage.setItem('isRefresh',1);
           window.location.href = 'http://www.lovelynz.com/latefly/wx_login_old.html?product=angel';
       }
    }

    if(is_weixin()){
        return;
    }{
        isApp();
    }
}]);

function isApp(){
    document.getElementById('isApp').style.display = "block";

}