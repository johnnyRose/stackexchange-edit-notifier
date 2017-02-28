/* global angular */

angular.module('StackExchangeEditNotifier', [])
   .controller('mainController', ['$scope', 'mainService', function ($scope, mainService) {
       $scope.greeting = "Hello World";
}]);
