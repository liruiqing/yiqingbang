"use strict";

demoApp.controller('addMyInfoController', ['$location','$scope','$rootScope','$timeout','httpService','common',function ($location,$scope,$rootScope,$timeout,httpService,common) {
    var user_id = getOpenId();

    $scope.model = {user_id:user_id,real_name:'',phone:'',person_id:''};
    httpService.post(BASE.URL+'user/findBaseInfo.json','',{user_id: getOpenId()}).success(function(data){

        if(data.phone==""||data.phone==null){
            $scope.model.phone ='';
        }else{
            $scope.model.phone = parseInt(data.phone);
        }
        if(data.person_id==""||data.person_id==null){
            $scope.model.person_id ='';
        }else{
            $scope.model.person_id = data.person_id;

        }
        if(data.real_name==""||data.real_name==null){
            $scope.model.real_name ='';
        }else{
            $scope.model.real_name = data.real_name;

        }

    });

    httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){
    });


    $scope.commit=function($event){
        $rootScope.showLoading();
        httpService.post(BASE.URL+'user/checkPhoneNo.json','',{user_id: getOpenId(),phone:$scope.model.phone}).success(function(data){
            if(data.result=='error'){
                $rootScope.hideLoading();
                $rootScope.showPopup(data.resultMessage);
                return;
            }else{
                if($scope.model.real_name==''||$scope.model.phone==''||$scope.model.person_id==''){
                    $rootScope.hideLoading();
                    $rootScope.showPopup("请检查信息填写是否完整！");
                    return;
                }else if(!isMobile($scope.model.phone)){
                    $rootScope.hideLoading();
                    $rootScope.showPopup("手机号格式错误！");
                    return;
                }else
                {
                    if(!(getIdCardInfo($scope.model.person_id).isTrue)){
						$rootScope.hideLoading();
                        $rootScope.showPopup("身份证格式错误");
                        return;
                    }

                    $scope.model.id = user_id;
                    httpService.post(BASE.URL+'user/userdesc_info.json','',$scope.model).success(function(data){
                        if(data.subscribe=='success'){
                            $rootScope.hideLoading();
                            localStorage.clear('userInfo');
                            localStorage.setItem('userInfo',JSON.stringify(data));
                            $location.path('main');



                        }else{
                            $rootScope.hideLoading();
                        }
                        $event.preventDefault();
                        $event.stopPropagation();
                    }).error(function(){
                        $rootScope.hideLoading();
                    })
                }
            }
        });
    }
}]);

