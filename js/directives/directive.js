
"use strict";

/************* 显示loading *****************/
demoApp.directive('showLoading',function() {
    return {
        restrict:'AEC',
        templateUrl:'views/common/loading.html',
        replace:true,
        transclude:true,
        scope:{
            isShow:'=isshow',
            content:'=content'
        },
        link:function(scope,element,attr){
            scope.toggleShow = function(event){
                scope.isShow = !scope.isShow;
            }
        }
    };
});

/******************* 弹出框指令  **********/
demoApp.directive('showPopup',function() {
    return {
        restrict:'AEC',
        templateUrl:'views/common/popup.html',
        replace:true,
        transclude:true,
        scope:{
            isShow:'=isshow',
            title:'=title',
            text:'=text'
        },
        link:function(scope,element,attr){
            //scope.isShow = true;
            scope.toggleShow = function(){
                scope.isShow = !scope.isShow;
            }
        }
    };
});

//  返回上一页指令
demoApp.directive('back',['$window',function($window) {
    return {
        restrict:'AEC',
        link:function(scope,element,attr){
            element.bind('click', function (event) {
                event.preventDefault();
                event.stopPropagation();
                if($window.history.length==1){
                    window.location.replace(BASE.MAIN);
                }else{
                    $window.history.back();
                }

            });
            element.bind('touchend', function () {

               // $window.history.back();
                if($window.history.length==1){
                    window.location.replace(BASE.MAIN);
                }else{
                    $window.history.back();
                }
                event.preventDefault();
                event.stopPropagation();

            });
        }
    };
}]);

//普通按钮 列表点击效果
demoApp.directive('down',['$window',function($window) {
    return {
        restrict:'AEC',
        link:function(scope,element,attr){
            /********************* 触摸事件监听 *******************************/
            element.bind('touchstart', function ($event) {
                $event.stopPropagation();
                angular.element(this).addClass('btndown');
            });
            element.bind('touchend', function () {
                angular.element(this).removeClass('btndown')
            });
            element.bind('touchmove', function () {
                angular.element(this).removeClass('btndown')
            });
            element.bind('touchcancel', function () {
                angular.element(this).removeClass('btndown')
            });
        }
    };
}]);

/******************** 图片点击效果  *********************/
demoApp.directive('downimg',['$window',function($window) {
    return {
        restrict:'AEC',
        link:function(scope,element,attr){

            /********************* 触摸事件监听 *******************************/

            element.bind('touchstart', function (event) {
                var imgurl =  angular.element(this).attr('src');
                //imgurl = imgurl.replace('_press.png','.png');
                if(imgurl.indexOf('_press.png')===-1){
                    imgurl = imgurl.replace('.png','_press.png');
                }
                angular.element(this).attr('src',imgurl);

            });
            element.bind('touchend', function (event) {
                var imgurl =  angular.element(this).attr('src');
                imgurl = imgurl.replace('_press.png','.png');
                angular.element(this).attr('src',imgurl);
                //event.preventDefault();
                element.onblur();
            });
            element.bind('touchmove', function (event) {
                var imgurl =  angular.element(this).attr('src');
                imgurl = imgurl.replace('_press.png','.png');
                angular.element(this).attr('src',imgurl);
                //event.preventDefault();
                element.onblur();
            });
            element.bind('touchcancel', function (event) {
                var imgurl =  angular.element(this).attr('src');
                imgurl = imgurl.replace('_press.png','.png');
                angular.element(this).attr('src',imgurl);
               // event.preventDefault();
                element.onblur();
            });

        }
    };
}]);

/************* 显示notice *****************/
demoApp.directive('showNotice',function() {
    return {
        restrict:'AEC',
        templateUrl:'views/common/notice.html',
        replace:true,
        transclude:true,
        scope:{
            isShow:'=isshow'
        }
    };
});


/************* 显示share *****************/
demoApp.directive('showShare',function() {
    return {
        restrict:'AEC',
        templateUrl:'views/common/share.html',
        replace:true,
        transclude:true,
        scope:{
            isShow:'=isshow'
        }
    };
});

/************* 显示share *****************/
demoApp.directive('showFriends',function() {
    return {
        restrict:'AEC',
        templateUrl:'views/common/friends.html',
        replace:true,
        transclude:true,
        scope:{
            isShow:'=isshow'
        }
    };
});

/************* 显示double *****************/

demoApp.directive('showDoubleSelect',function() {
    return {
        restrict:'AEC',
        templateUrl:'views/common/doubleClick.html',
        replace:true,
        transclude:true,
        scope:{
            isShow:'=isshow'
        }
    };
});


/************* 显示notice *****************/
demoApp.directive('fixed',function() {
    return {
        restrict:'AEC',
        link:function(scope,element,attr){
            angular.element(document.querySelector('input')).bind('focus',function(){
                angular.element(document.querySelector('.fixed')).addClass('fixfixed');
            });
            angular.element(document.querySelector('input')).bind('blur',function(){
                angular.element(document.querySelector('.fixed')).removeClass('fixfixed');
            });
        }
    };
});

/************* 显示area *****************/
var initLiandong;
demoApp.directive('showArea',['httpService',function(httpService) {
    return {
        restrict:'AEC',
        templateUrl:'views/common/area.html',
        replace:true,
        transclude:true,
        scope:{
            address:'=ngModel'
        },link:function(scope,element,attr){
            scope.$on("Ctr1NameChangeFromParrent",

                function (event, msg) {
                    scope.address= msg;

                    scope.init()

                });
            scope.isShow= false;
            scope.liandong = model_province;
            scope.page = {province:'',city:'',county:''}; //选中 的item
            scope.init = function () {

                //scope.address = '北京,北京,海淀区';
                if(scope.address){
                   var arr = scope.address.split(',');
                    if(arr.length==3){
                        scope.page.province=  getItemByName(arr[0],model_province);
                        httpService.post(BASE.URL+'platform/getAreas.json','',{area_id:scope.page.province.area_id,area_type:1}).success(function(data){
                            scope.city = data;
                            scope.page.city=   getItemByName(arr[1],data);

                            httpService.post(BASE.URL+'platform/getAreas.json','',{area_id:scope.page.city.area_id,area_type:2}).success(function(data1){
                                scope.county = data1;
                                scope.page.county=  getItemByName(arr[2],data1);
                            });
                        })
                    }
                }
            }
            initLiandong =  scope.init;
            scope.setAddress  = function(){
                scope.address = scope.page.province.area_name+','+scope.page.city.area_name+','+scope.page.county.area_name;
            }
            scope.init();
            scope.selectItem = function(item,event){

                scope.isShow = false;
                if(item.area_type==1){
                    scope.page.province=  item;
                    scope.getCity(item.area_id);
                }
                if(item.area_type==2){
                    scope.page.city=  item
                    scope.getCounty(item.area_id);
                }
                if(item.area_type==3){
                    scope.page.county=  item
                }
                scope.setAddress();
                event.preventDefault();
                event.stopPropagation();
            }
            var state = '';
            scope.showArea = function(title){
                scope.showTitle =title;
                state = title;
                if(title=='省份'){
                    scope.liandong = model_province;
                }
                if(title=='市'){
                    if(!scope.page.city){
                        rootscope.showPopup('请选择省份');
                        return;
                    }
                    scope.liandong = scope.city;
                }
                if(title=='县/区'){
                    if(!scope.page.county){
                        rootscope.showPopup('请选择省份');
                        return;
                    }
                    scope.liandong = scope.county;
                }
                scope.isShow = true;
            };
            scope.province = model_province;
            scope.getCity= function(area_id){
                httpService.post(BASE.URL+'platform/getAreas.json','',{area_id:area_id,area_type:1}).success(function(data){
                    scope.city = data;
                    scope.page.city=  data[0];
                    scope.getCounty(data[0].area_id);
                    if(state=='市'){
                        scope.liandong = scope.city;
                    }
                    scope.setAddress()
                })
            }

            scope.getCounty= function(area_id){
                httpService.post(BASE.URL+'platform/getAreas.json','',{area_id:area_id,area_type:2}).success(function(data){
                    scope.county = data;
                    scope.page.county=  data[0];
                    if(state=='县/区'){
                        scope.liandong = data;
                    }
                    scope.setAddress();
                });
            }
        }
    };
}]);


/************* 显示select *****************/

demoApp.directive('showSelect',function() {
    return {
        restrict:'AEC',
        templateUrl:'views/common/select.html',
        replace:true,
        transclude:true,
        scope:{
            gender:'=ngModel'
        },link:function(scope,element,attr){
            scope.isShow = false;
        }
    };
});

// 日期选择指令
demoApp.directive('dateDirective',function() {
    return {
        restrict:'AEC',
        templateUrl:'views/common/date.html',
        replace:false,
        scope:{
            selectDate:'=ngModel'
        },
        link:function(scope,element,attr){
            var time  =  scope.selectDate;
            scope.isShow =false;
            if(time){
                if(time.length>=8){
                    var arr = time.split('-');
                    scope.year = arr[0];
                    scope.month = arr[1];
                    scope.day = arr[2];
                }else{
                    scope.year = getYear();
                    scope.month = getMonth();
                    scope.day = getDay();
                }
            }else{
                scope.year = getYear();
                scope.month = getMonth();
                scope.day = getDay();
            }

            scope.changeDate = function(str){
                if(str=='addYear'){
                    scope.year++;
                }
                if(str=='reduceYear'){
                    scope.year--;
                    if(scope.year<1975){
                        scope.year = 1975;
                    }
                }
                if(str=='addMonth'){
                    scope.month++;
                    if(scope.month>12){
                        scope.month = scope.month+(-12);
                    }
                }
                if(str=='reduceMonth'){
                    scope.month--;
                    if(scope.month<1){
                        scope.month = scope.month+12;
                    }
                }
                var maxDay =  getTheMonthDay(scope.year,scope.month);
                if(scope.day>maxDay){
                    scope.day = maxDay;
                }
                if(str=='addDay'){
                    scope.day ++;
                    if(scope.day>maxDay){
                        scope.day = 1;
                    }
                }
                if(str=='reduceDay'){
                    scope.day--;
                    if(scope.day<1){
                        scope.day = maxDay;
                    }
                }
                scope.selectDate = scope.year+'-'+scope.month+'-'+scope.day;
            }
            function getYear(){
                var dd = new Date();
                var y = dd.getFullYear();
                return y;
            }
            function getMonth(){
                var dd = new Date();
                var y = dd.getMonth()+1;
                return y;
            }
            function getDay(){
                var dd = new Date();
                var y = dd.getDate();
                return y;
            }
            function getTheMonthDay(year,month)
            {
                var new_year = year;    //取当前的年份
                var new_month = month++;//取下一个月的第一天，方便计算（最后一天不固定）
                if(month>12)            //如果当前大于12月，则年份转到下一年
                {
                    new_month -=12;        //月份减
                    new_year++;            //年份增
                }
                var new_date = new Date(new_year,new_month,1);                //取当年当月中的第一天
                return (new Date(new_date.getTime()-1000*60*60*24)).getDate();//获取当月最后一天日期
            }

            scope.toggleShow = function(){
                scope.isShow = !scope.isShow;
            }
        }
    };
});