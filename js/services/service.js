"use strict";

demoApp.factory('service', ['httpService',function(httpService) {
        var common = {};
        var obj={};
        if(is_weixin()) {
            obj = {code:code,flag:'WX'};
        }else{
            obj = {code:code,flag:'APP'};
        }
        common.get = function (_url,_params,_data) {
            httpService.post(BASE.URL+'payment/getWXOpenid.json','',obj).success(function(data){
                $scope.model = data.result;
            })
        }
        return common;
    }
]);

