'use strict';
// 实现一个AngularJS控制器来利用$http请求获取用户数据
angular.module('myApp', []).controller('myController', ['$scope', '$http', function($scope, $http) {
    $http.get('/user/profile').success(function(data, status, headers, config) {
        $scope.user = data;
        $scope.error = "";
    }).error(function(data, status, headers, config) {
        $scope.user = {};
        $scope.error = data;
    });
}]);
