//"use strict";

demoApp.controller('myInfoController', ['$scope','$rootScope','$timeout','httpService','common','$http','$location',function ($scope,$rootScope,$timeout,httpService,common,$http,$location) {

    $rootScope.$on("Ctr1NameChange",
        function (event, msg) {
                $scope.$broadcast("Ctr1NameChangeFromParrent", msg);
         });

        $scope.init= function(){
            httpService.post(BASE.URL+'user/findUserinfo.json','',{user_id:getOpenId()}).success(function(data){
                $scope.model=data;
                $rootScope.childsInfo=data.childsInfo;
                if(data.user_status==4||data.user_status==5){
                    document.getElementById('goOutTime').style.display="block"
                }
                if((data.childsInfo==''||data.childsInfo==null)&&!localStorage.getItem('hideChildsInfo',true)){
                    document.getElementById('showChildInfo3').style.display="block";
                }
                $scope.$emit("Ctr1NameChange",data.address);
            })
        }

        $scope.hideChild = function(){
            if(document.getElementById('childInfo3').checked==true){
                localStorage.setItem('hideChildsInfo',true)
                document.getElementById('showChildInfo3').style.display="none";
            }else{
                document.getElementById('showChildInfo3').style.display="none";
            }
        }

    $scope.isaddChild = function(){
            if($rootScope.childsInfo==''||$rootScope.childsInfo==null){
                    $scope.addChild();
            }
    }

    $timeout(function(){
        $scope.isaddChild();
    },500)

        $scope.addChild = function () {
            $scope.model.childsInfo.push(getChild());
        }

        $scope.removeChild = function (index) {
            document.getElementById('isdeleteChild').style.display="block";
        }

        $scope.suredelete = function (){
            $scope.model.childsInfo.pop();
            document.getElementById('isdeleteChild').style.display="none"
        }

        $scope.cancelDelete = function(){
            document.getElementById('isdeleteChild').style.display="none"
        }

        $scope.commitUserInfo = function(){
            if($scope.model.login_name==""){
                $rootScope.showPopup("昵称不能为空")
                return;
            }

            var  len=$scope.model.childsInfo.length;
            if(len>0){
                for(var i=0;i<len;i++){
                    if($scope.model.childsInfo[i].child_name==""){
                        $rootScope.showPopup("孩子姓名不能为空");
                        return;
                    }
                    else if($scope.model.childsInfo[i].child_birthday==""){
                        $rootScope.showPopup("孩子出生年月不能为空");
                        return;
                    }else if(!($scope.model.childsInfo[i].identifyId==""||$scope.model.childsInfo[i].identifyId==null)){
                        if(!(getIdCardInfo($scope.model.childsInfo[i].identifyId).isTrue)){
                            $rootScope.showPopup("孩子身份证号码输入错误");
                            return;
                        }
                    }
                }
            };

            $rootScope.loading("show");
            httpService.post(BASE.URL+'user/user_info.json','',$scope.model).success(function(data){
                $rootScope.loading("hide");
                if(data.result=='success'){
                    document.getElementById('saveSuccess').style.display="block";
                }
            }).error(function(){
            });
        }

        $scope.getStatus = function(){
            httpService.post(BASE.URL+'user/owerInfo.json','',{user_id:getOpenId()}).success(function(data){
            })
        }
        $scope.init();

    $scope.initChild = function(i){
        if(isCardNo($scope.model.childsInfo[i].identifyId)){
            $scope.model.childsInfo[i].child_birthday = getBirthday($scope.model.childsInfo[i].identifyId);
            $scope.model.childsInfo[i].child_gender = getSex($scope.model.childsInfo[i].identifyId);
        };
    }
}]);

function getChild(){
    return {"user_id":'123',child_name:'',child_infantname:'',child_gender:'',child_birthday:'',child_school:'',born_hospital:''};
}

function getBirthday(idCard) {
    var birthday = "";
    if(idCard != null && idCard != ""){
        if(idCard.length == 15){
            birthday = "19"+idCard.substr(6,6);
        } else if(idCard.length == 18){
            birthday = idCard.substr(6,8);
        }
        birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
    }
    return birthday;
};

function getSex(idCard){
    return parseInt(idCard.substr(16, 1)) % 2 ==1?1:2
}