"use strict";

demoApp.controller('messageController', ['$scope','$rootScope','httpService','$routeParams','$timeout',function ($scope,$rootScope,httpService,$routeParams,$timeout) {

    $scope.page = {replyInput:' 留言 '}
    $scope.pageNo  = 0;
    $scope.model = [];

    httpService.post(BASE.URL+'event/showEventDetail.json','',{event_id:request('event_id')}).success(function(data){
        $scope.picAndText=data
    })

    httpService.post(BASE.URL+'event/getComment.json','',{id: request('event_id'),pageNo:$scope.pageNo,pageSize:10}).success(function(data){
        if(data.length==0){
            return;
        }
        $scope.pageNo++;
        $scope.model = data;
    })

    $scope.getMore = function(){
        httpService.post(BASE.URL+'event/getComment.json','',{id: request('event_id'),pageNo:$scope.pageNo,pageSize:10}).success(function(data){
            if(data.length==0){
                $scope.showPopup("没有更多了");
                return;
            }
            $scope.pageNo++;
            $scope.model = data;
        })
    }

    $scope.getLast = function(){
        if( $scope.pageNo<=1){
            return;
        }
        $scope.pageNo--;

        httpService.post(BASE.URL+'event/getComment.json','',{id: request('event_id'),pageNo:$scope.pageNo-1,pageSize:10}).success(function(data){
            if(data.length==0){
                $scope.showPopup("没有更多了");
                $scope.pageNo++;
                return;
            }
            $scope.model = data;
            console.log(JSON.stringify(data))
        }).error(function(data){
        });
    }

    // 1是事件的   2是评论的
    $scope.message = {user_id:getUserId(),event_id: request('event_id'),comment_type:'1',content:"",to_user_id:''};

    $scope.sendMsg = function($event){
        if($scope.message.content==""){
            $rootScope.showPopup("留言不能为空");
            return;
        }
        httpService.post(BASE.URL+'event/pubComment.json','',$scope.message).success(function(data){
            window.location.reload();
        })
        $event.stopPropagation();
        $event.preventDefault();
    }

    $scope.reply  = function (item,$event) {
        $event.preventDefault();
        $event.stopPropagation();
        document.getElementById('replyInput').focus();
        $scope.page.replyInput = ' 回复'+item.login_name;
        $scope.message.to_user_id = item.user_id;
    }

    $scope.inputFocus = function(){
        $timeout(function(){
            angular.element(document.documentElement).addClass('trans_time');
            angular.element(document.body).addClass('trans_time');
            document.documentElement.scrollTop = 1000;
            document.body.scrollTop = 1000;
        },50);
    }

    $scope.inputBlur = function(){
        $scope.page.replyInput=' 留言';
        $scope.message.to_user_id = '';
    }

    //============点赞-------------0没点，1点过--------
    $scope.good = function(item){
        if($scope.support_num==null){
            $scope.support_num=0
        }
            httpService.post(BASE.URL+'event/loveComment.json','',{user_id:getUserId(),event_id: request('event_id'),id:item.id,to_user_id:item.user_id}).success(function(data){
                  if(data.result=='success'){
                      httpService.post(BASE.URL+'event/getComment.json','',{id: request('event_id'),pageNo:$scope.pageNo-1,pageSize:10}).success(function(data){
                          $scope.model = data;
                      })
                  }else{
                      $rootScope.showPopup(data.resultMessage)
                      httpService.post(BASE.URL+'event/getComment.json','',{id: request('event_id'),pageNo:$scope.pageNo-1,pageSize:10}).success(function(data){
                          $scope.model = data;
                      })
                  }
            }).error(function(data){
            });
    };

    $scope.goBottom= function (){
        var h = window.innerHeight
        h = h-90;
        document.getElementById('high').style.height=h+'px';
    }
    $scope.goBottom();
}]);