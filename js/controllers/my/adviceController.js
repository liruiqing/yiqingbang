"use strict";

demoApp.controller('adviceController', ['$scope','$rootScope','$timeout','httpService','common',function ($scope,$rootScope,$timeout,httpService,common) {
    //反馈类型 1-----问题反馈 2-----功能反馈
    $scope.model = {userId:2,feedbackType:1,content:''};
    $scope.commit_advice = function(){
        if(!$scope.model.content){
            $rootScope.popup("show",'反馈意见不能为空');
            return;
        }

        httpService.post(BASE.URL+'platform/feedback.json','',$scope.model).success(function(data){
            console.log(JSON.stringify(data));
            if(data.result=='success'){
                $rootScope.popup("show",'反馈意见提交成功');
                setTimeout(function(){
                    window.history.back();
                },1500);
            }
        }).error(function(data){
        })
    }

    $scope.aboutAdviceInfoLeft = function(){
        $scope.model.feedbackType=1
        document.getElementById("adviceInfo").setAttribute("placeholder","反馈不能正常使用的功能");
    }

    $scope.aboutAdviceInfoRight = function(){
        $scope.model.feedbackType=2
    document.getElementById("adviceInfo").setAttribute("placeholder","您对我们的功能有什么改版的建议。");
}
}]);