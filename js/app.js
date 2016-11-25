"use strict";
//程序入口
var demoApp = angular.module('demoApp', ['ngRoute','ngTouch','ngAnimate','ngSanitize']);
//路由配置
demoApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/main', {                                     /*** 主页 ***/
            templateUrl: 'views/main.html?fga=rvdsw3242',
            controller: 'mainController'
        }).when('/login', {                                 /*** 登录 ***/
            templateUrl: 'views/login.html?fga=rvdsw3242',
            controller: 'loginController'
        }).when('/register', {                              /*** 注册 ***/
            templateUrl: 'views/register.html?fga=rvdsw3242',
            controller: 'registerController'
        }).when('/love', {                                  /*** 献爱心 ***/
            templateUrl: 'views/love/love.html?fga=rvdsw3242',
            controller: 'loveController'
        }).when('/accounts', {                             /*** 平台账目 ***/
            templateUrl: 'views/accounts/account.html?fga=rvdsw3242',
            controller: 'accountController'
        }).when('/my', {                                    /*** 我的 ***/
            templateUrl: 'views/my/my.html?fga=rvdsw3242',
            controller: 'myController'
        }).when('/vipNumber', {                             /*** 会员总数 ***/
            templateUrl: 'views/vipNumber.html?fga=rvdsw3242',
            controller: 'vipNumberController'
        }).when('/allMoney', {                              /*** 累计金额 ***/
            templateUrl: 'views/allMoney.html?fga=rvdsw3242',
            controller: 'allMoneyController'
        }).when('/helpEvents', {                            /*** 互助事件 ***/
            templateUrl: 'views/helpEvents.html?fga=rvdsw3242',
            controller: 'helpEventsController'
        }).when('/event/:id/:current_status', {                             /*** 事件详情 ***/
            templateUrl: 'views/event.html?fga=rvdsw3242',
            controller: 'eventController'
        }).when('/eventInfo/:event_id/:current_status/:event_track_id/:currentstatus', {                             /*** 事件详情 ***/
            templateUrl: 'views/eventInfo.html?fga=rvdsw3242',
            controller: 'eventInfoController'
        }).when('/message', {                               /*** 留言 ***/
            templateUrl: 'views/message.html?fga=rvdsw3242',
            controller: 'messageController'
        }).when('/juanZhu', {                               /*** 自愿捐助 ***/
            templateUrl: 'views/juanZhu.html?fga=rvdsw3242',
            controller: 'juanZhuController'
        }).when('/certificate', {                           /*** 自愿捐助证书 ***/
            templateUrl: 'views/certificate.html?fga=rvdsw3242',
            controller: 'certificateController'
        }).when('/allAccount', {                            /*** 捐助总额 ***/
            templateUrl: 'views/accounts/allAccount.html?fga=rvdsw3242',
            controller: 'allAccountController'
        }).when('/allLeiJiZiYuan', {                            /*** 共计捐助总额 ***/
        templateUrl: 'views/accounts/allLeiJiZiYuan.html?fga=rvdsw3242',
            controller: 'allLeiJiZiYuanController'
        }).when('/allHelpMoney', {                            /*** 累计互助金 ***/
        templateUrl: 'views/accounts/allHelpMoney.html?fga=rvdsw3242',
            controller: 'allHelpMoneyController'
        }).when('/outHelpMoney', {                            /*** 捐出互助金 ***/
        templateUrl: 'views/accounts/outHelpMoney.html?fga=rvdsw3242',
            controller: 'outHelpMoneyController'
        }).when('/outMyMoney', {                            /*** 捐出自愿捐助 ***/
        templateUrl: 'views/accounts/outMyMoney.html?fga=rvdsw3242',
            controller: 'outMyMoneyController'
        }).when('/juanZhuBang', {                           /*** 自愿捐助排行榜 ***/
            templateUrl: 'views/accounts/juanZhuBang.html?fga=rvdsw3242',
            controller: 'juanZhuBangController'
        }).when('/accountInfo', {                                    /*** 账户明细 ***/
            templateUrl: 'views/my/accountInfo.html?fga=rvdsw3242',
            controller: 'accountInfoController'
        }).when('/inputPassword', {                                    /*** 输入密码弹框 ***/
            templateUrl: 'views/my/inputPassword.html?fga=rvdsw3242',
            controller: 'inputPasswordController'
        }).when('/menuInfo', {                                    /*** 我的 ***/
            templateUrl: 'views/my/menuInfo.html?fga=rvdsw3242',
            controller: 'menuInfoController'
        }).when('/product', {                                    /*** 我的 ***/
            templateUrl: 'views/my/product.html?fga=rvdsw3242',
            controller: 'productController'
        }).when('/myInfo', {                                    /*** 个人信息 ***/
            templateUrl: 'views/my/myInfo.html?fga=rvdsw3242',
            controller: 'myInfoController'
        }).when('/recharge', {                                    /*** 立即充值 ***/
            templateUrl: 'views/recharge.html?fga=rvdsw3242',
            controller: 'rechargeController'
        }).when('/loveBook', {                                    /*** 爱心不 ***/
            templateUrl: 'views/my/loveBook.html?fga=rvdsw3242',
            controller: 'loveBookController'
        }).when('/loveLetter/:event_id/:current_status', {                                    /*** 自愿捐助证书 ***/
            templateUrl: 'views/my/loveLetter.html?fga=rvdsw3242',
            controller: 'loveLetterController'
        }).when('/friends', {                                    /*** 好友 ***/
            templateUrl: 'views/my/friends.html?fga=rvdsw3242',
            controller: 'friendsController'
        }).when('/shenQing', {                                    /*** 互助申请 ***/
            templateUrl: 'views/my/shenQing.html?fga=rvdsw3242',
            controller: 'shenQingController'
        }).when('/myMessage', {                                    /*** 我的消息 ***/
            templateUrl: 'views/my/myMessage.html?fga=rvdsw3242',
            controller: 'myMessageController'
        }).when('/more', {                                    /*** 更多 ***/
            templateUrl: 'views/my/more.html?fga=rvdsw3242',
            controller: 'moreController'
        }).when('/myInfo', {                                    /*** 编辑个人信息 ***/
            templateUrl: 'views/my/myInfo.html?fga=rvdsw3242',
            controller: 'myInfoController'
        }).when('/aboutUs', {                                    /*** 关于我们 ***/
            templateUrl: 'views/my/aboutUs.html?fga=rvdsw3242',
            controller: 'aboutUsController'
        }).when('/advice', {                                    /*** 意见反馈 ***/
            templateUrl: 'views/my/advice.html?fga=rvdsw3242',
            controller: 'adviceController'
        }).when('/addPlan', {                                    /*** 加入计划 ***/
            templateUrl: 'views/addPlan.html?fga=rvdsw3242',
            controller: 'addPlanController'
        }).when('/addAppPlan', {                                    /*** 加入app 计划 ***/
            templateUrl: 'views/addPlan.html?fga=rvdsw3242',
            controller: 'addAppPlanController'
        }).when('/addMyInfo', {                                    /*** 完善个人信息 ***/
            templateUrl: 'views/addMyInfo.html?fga=rvdsw3242',
            controller: 'addMyInfoController'
        }).when('/myBaoZhang', {                                    /*** 完善个人信息 ***/
            templateUrl: 'views/my/myBaoZhang.html?fga=rvdsw3242',
            controller: 'myBaoZhangController'
        }).when('/currentAccount', {                                    /*** 捐助次数 ***/
            templateUrl: 'views/accounts/currentAccount.html?fga=rvdsw3242',
            controller: 'currentAccountController'
        }).when('/currentJuanZhu', {                                    /*** 自愿捐助次数 ***/
            templateUrl: 'views/accounts/currentJuanZhu.html?fga=rvdsw3242',
            controller: 'currentJuanZhuController'
        }).when('/weixin', {                                    /*** 自愿捐助次数 ***/
            templateUrl: 'views/weixin.html?fga=rvdsw3242',
            controller: 'weixinController'
        })
        .otherwise({
            redirectTo: '/main'
        });
}
]);

