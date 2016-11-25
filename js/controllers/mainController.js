"use strict";

demoApp.controller('mainController', ['$scope','httpService','$location','$timeout','$rootScope','$templateCache',function ($scope,httpService,$location,$timeout,$rootScope,$templateCache) {
    //var app_Id = request('app_id');
    //localStorage.setItem('app_Id',app_Id);
    var jssor_slider1_starter = function (containerId) {
        var options = {
            $FillMode: 2,                                       //[Optional] The way to fill image in slide, 0 stretch, 1 contain (keep aspect ratio and put all inside slide), 2 cover (keep aspect ratio and cover whole slide), 4 actual size, 5 contain for large image, actual size for small image, default value is 0
            $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
            $AutoPlayInterval: 4000,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
            $PauseOnHover: 1,                                   //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

            $ArrowKeyNavigation: true,   			            //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
            $SlideEasing: $JssorEasing$.$EaseOutQuint,          //[Optional] Specifies easing for right to left animation, default value is $JssorEasing$.$EaseOutQuad
            $SlideDuration: 800,                                //[Optional] Specifies default duration (swipe) for slide in milliseconds, default value is 500
            $MinDragOffsetToSlide: 20,                          //[Optional] Minimum drag offset to trigger slide , default value is 20
            //$SlideWidth: 600,                                 //[Optional] Width of every slide in pixels, default value is width of 'slides' container
            //$SlideHeight: 300,                                //[Optional] Height of every slide in pixels, default value is height of 'slides' container
            $SlideSpacing: 0, 					                //[Optional] Space between each slide in pixels, default value is 0
            $DisplayPieces: 1,                                  //[Optional] Number of pieces to display (the slideshow would be disabled if the value is set to greater than 1), the default value is 1
            $ParkingPosition: 0,                                //[Optional] The offset position to park slide (this options applys only when slideshow disabled), default value is 0.
            $UISearchMode: 1,                                   //[Optional] The way (0 parellel, 1 recursive, default value is 1) to search UI components (slides container, loading screen, navigator container, arrow navigator container, thumbnail navigator container etc).
            $PlayOrientation: 1,                                //[Optional] Orientation to play slide (for auto play, navigation), 1 horizental, 2 vertical, 5 horizental reverse, 6 vertical reverse, default value is 1
            $DragOrientation: 1,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)



            $BulletNavigatorOptions: {                          //[Optional] Options to specify and enable navigator or not
                $Class: $JssorBulletNavigator$,                 //[Required] Class to create navigator instance
                $ChanceToShow: 2,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 1,                                 //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1,                                      //[Optional] Steps to go for each navigation request, default value is 1
                $Lanes: 1,                                      //[Optional] Specify lanes to arrange items, default value is 1
                $SpacingX: 8,                                   //[Optional] Horizontal space between each item in pixel, default value is 0
                $SpacingY: 8,                                   //[Optional] Vertical space between each item in pixel, default value is 0
                $Orientation: 1                                 //[Optional] The orientation of the navigator, 1 horizontal, 2 vertical, default value is 1
            },

            $ArrowNavigatorOptions: {                       //[Optional] Options to specify and enable arrow navigator or not
                $Class: $JssorArrowNavigator$,              //[Requried] Class to create arrow navigator instance
                $ChanceToShow: 1,                               //[Required] 0 Never, 1 Mouse Over, 2 Always
                $AutoCenter: 2,                                 //[Optional] Auto center arrows in parent container, 0 No, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
                $Steps: 1                                       //[Optional] Steps to go for each navigation request, default value is 1
            }
        };

        var jssor_slider1 = new $JssorSlider$(containerId, options);

        //responsive code begin
        //you can remove responsive code if you don't want the slider scales while window resizes
        function ScaleSlider() {
            var bodyWidth = document.body.clientWidth;
            if (bodyWidth)
                jssor_slider1.$ScaleWidth(Math.min(bodyWidth, 1920));
            else
                $Jssor$.$Delay(ScaleSlider, 30);
        }

        ScaleSlider();
        $Jssor$.$AddEvent(window, "load", ScaleSlider);
        $Jssor$.$AddEvent(window, "resize", $Jssor$.$WindowResizeFilter(window, ScaleSlider));
        $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
    };
    jssor_slider1_starter('slider1_container');


$rootScope.isShowMessage=false;
$rootScope.showChildInfo1=false;
    if(getOpenId()){
        //var userInfo = JSON.parse(localStorage.getItem("userInfo"));
        var user_status= getUserStatus();

        httpService.post(BASE.URL+'user/findUserById.json','',{user_id:getOpenId()}).success(function(data){
            localStorage.setItem("userInfo",JSON.stringify(data));
        /*    if(!data.user_status){
            }else{
                localStorage.setItem("userInfo",JSON.stringify(data));
            }*/
        });



    }


    var redirect_state=0;
    var share_get_money_openid = request('share_get_money_openid');
    if(share_get_money_openid){
        redirect_state = share_get_money_openid;
    }
    var share_openid = request('share_openid');
    if(share_openid){
        if(sessionStorage.getItem(share_openid)){
            return;
        }
        httpService.post(BASE.URL+'user/shareOneMoney.json','',{user_id:getOpenId(),share_openid:share_openid}).success(function(data){
            sessionStorage.setItem(share_openid,data.resultMessage);
            $rootScope.showPopup(data.resultMessage);
            return;
        });
    }
    var url = 'http://www.lovelynz.com/1717/web/#/addPlan?&response_type=code&scope=snsapi_userinfo&state='+redirect_state+'&from=main';
    $scope.model = {user_status:user_status,total:{},users:{},url:'http://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf6d98b24d8e2185a&redirect_uri='+decodeURI(url)+'#wechat_redirect'};
    $scope.init = function(){
        httpService.post(BASE.URL+'platform/newTotal.json','','').success(function(data){
            //console.log(JSON.stringify(data));
            var total_user = data.total_user;
            var allmoney = data.allmoney;
            $scope.model.total = data;
            $rootScope.rootModel.total=data;
            var money_demo = new CountUp("total_money_count", 0.00,allmoney, 2, 1.5, {useEasing : false, useGrouping : true, separator : ',', decimal : '.',prefix :'',suffix : ''});
            money_demo.start();
            var user_demo = new CountUp("total_user_count", 0, total_user, 0,1.5, {useEasing : false, useGrouping : true,separator : ',', decimal : '.', prefix : '', suffix : ''});
            user_demo.start();
        });
    }
    $scope.init();

    if((request('code')!=null&&request('code')!='')||(request('app_user_id')!=null&&request('app_user_id')!='')||(request('alter_base_id')!=null&&request('alter_base_id')!='')){

        $timeout(function(){
            var shareOpenId = 0;
            var flag = 0;
            if(share_get_money_openid){

                shareOpenId = share_get_money_openid;
                flag = 1;
            }else if(share_openid){

                shareOpenId = share_openid;
                flag = 1;
            }
            if(request('flag')){

                flag = 1;
            }



            if(sessionStorage.getItem(request('code'))){
                return;
            }
            sessionStorage.setItem(request('code'),1);

            var isApp = {};
            if(is_weixin()){

                isApp = {alter_base_id:request('alter_base_id'),app_user_id:request('app_user_id'),code:request('code'),shareOpenId:shareOpenId,flag:flag,device:'WX'};
            }else{
                isApp = {alter_base_id:request('alter_base_id'),app_user_id:request('app_user_id'),code:request('code'),shareOpenId:0,flag:flag,device:'APP'};
            }

            httpService.post(BASE.URL+'payment/getOnlyWXOpenid.json','',isApp).success(function(data){
                var user_id= getOpenId();
                if( getOpenId()){
                    if(data.id){
                        if(data.id==user_id){
                            var share_get_money_openid = request('share_get_money_openid');
                            if(share_get_money_openid&&(getOpenId()!=share_get_money_openid)){
                                httpService.post(BASE.URL+'user/updateFriendRelation.json','',{user_id:getOpenId(),share_code:share_get_money_openid}).success(function(data){
                                });
                            }
                        }else{
                            localStorage.removeItem('userInfo');
                            $scope.model.user_status = 0;
                        }
                    }
                }

                if(!is_weixin()){
                    localStorage.setItem("userInfo",JSON.stringify(data));
                    $scope.model.user_status=getUserStatus();
                    //location.reload(true);


                }
                localStorage.removeItem('attention');
                if(data.subscribe==0){
                    localStorage.setItem('attention',1);

                }

            });
        },100);

    }


    httpService.post(BASE.URL+'platform/lately.json','','').success(function(data){
        //console.log(JSON.stringify(data));
       $scope.model.users = data;
    });

        var share_openid = request('share_openid');
        if(share_openid){
            if(sessionStorage.getItem(share_openid)){
                return;
            }
            //!!!!!!!!!
            httpService.post(BASE.URL+'user/shareOneMoney.json','',{user_id:getOpenId(),share_openid:share_openid}).success(function(data){
                sessionStorage.setItem(share_openid,data.resultMessage);
                $rootScope.showPopup(data.resultMessage);
                return;
            });
        }

    $scope.isMoveTo = function ($event) {

        $event.preventDefault();
        $event.stopPropagation();
        if ($scope.model.user_status == 3 || $scope.model.user_status == 4 || $scope.model.user_status == 5) {
            $location.path('/loveBook');
            $event.preventDefault();
            $evsent.stopPropagation();
            return;
        }

        if ($scope.model.user_status == 2) {
            $rootScope.showPopup('分享朋友圈后才算加入计划哦')
            return;
        }

        if (share_openid) {
            redirect_state = "share_openid" + share_openid;
        }
        if(is_weixin()){
            window.location.href = 'weixin.html?state=' + redirect_state;
        }else{
            if(localStorage.getItem('userInfo')){
                $rootScope.moveTo('addAppPlan');
            }else{

            }


        }


    }


  $timeout(function () {
      httpService.post(BASE.URL+'user/findUserById.json','',{user_id: getOpenId()}).success(function(data){

          if(data.user_status==0||data.user_status==''||data.user_status==null){
              if(!localStorage.getItem("firstView")){
                  document.getElementById('firstView').style.display="block";
                  localStorage.setItem("firstView","1");
                  return;
              }
          }else if(data.user_status==1&&(data.person_id==null||data.person_id=='')){
              $rootScope.showPopup('请先完善您的基本信息');
              $timeout(function(){
                  $location.path('addMyInfo');
              },1500);
              return;
          }else if(data.user_status==3||data.user_status==4){
              httpService.post(BASE.URL+'user/findUserinfo.json','',{user_id:getOpenId()}).success(function(data){
                  if((data.childsInfo==''||data.childsInfo==null)&&!localStorage.getItem('hideChildsInfo',true)){

                      $rootScope.showChildInfo1 = !$rootScope.showChildInfo1;
                  }
              })
          }
      });
  },500)

    $scope.goBottom= function (){
        var h = window.innerHeight
        h = h-60;
        document.getElementById('maindiv').style.height=h+'px';
    }
    $scope.goBottom();
    $scope.hideShare = function(){
        document.getElementById('isShare').style.display="none";
        document.getElementById('firstView').style.display="none";
    }

    $scope.hideChild = function(){
        if(document.getElementById('childInfo1').checked==true){
            localStorage.setItem('hideChildsInfo',true)
            $rootScope.showChildInfo1 = !$rootScope.showChildInfo1;
        }else{
            $rootScope.showChildInfo1 = !$rootScope.showChildInfo1;
        }
    }

    $scope.moveToGuanZhu = function(){
        window.location.href="http://mp.weixin.qq.com/s?__biz=MzAxMzIyNzIyMQ==&mid=218780662&idx=2&sn=c573f64d55830d18922e9cfca89628e2#rd"
    }
    $scope.callNoback = function($event){
        $event.stopPropagation();
        $event.preventDefault();
        return;
    }
    $scope.share=true;
    if(is_weixin()){
        $scope.share=false;
    }

    $scope.moveToLogin = function (){
        window.location.href="http://www.lovelynz.com/latefly/wx_login_old.html?product=angel";
    }

    if(localStorage.getItem('isRefresh')){
        localStorage.clear('isRefresh');
    }

    $scope.toggleMsg = function(){
       if($rootScope.isShowMessage){
           $rootScope.isShowMessage=!$rootScope.isShowMessage
       }else{
           $rootScope.isShowMessage=!$rootScope.isShowMessage;
           $rootScope.isShowMessage=!$rootScope.isShowMessage

       }

    }
    $scope.go = function(){

        if(getUserStatus()==0&&!is_weixin()){
            $rootScope.isShowMessage = !$rootScope.isShowMessage;
        }
    }
}]);

