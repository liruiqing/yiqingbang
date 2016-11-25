"use strict";

demoApp.factory('httpService', ['$http',function($http) {
        var common = {};
        common.post = function (_url,_params,_data) {

            return $http({
                method: 'POST',
                url: _url,
                params:_params,
                data: _data,
                timeout:15000,
                headers: {'Content-Type': 'application/json'}
                //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
        common.get = function (_url,_params ) {
            return $http({
                method: 'GET',
                url: _url,
                params:_params,
                //data: _data,
                timeout:15000,
                headers: {'Content-Type': 'application/json'}
                //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
        }
        return common;
    }
]);