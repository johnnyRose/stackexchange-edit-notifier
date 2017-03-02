/* global angular */

angular.module('StackExchangeEditNotifier', ['ngSanitize', 'ui.select'])
   .controller('mainController', ['$scope', 'mainService', function ($scope, mainService) {
      $scope.greeting = "Hello World";
      
      var vm = this;
       
      mainService.GetStackExchangeSites().then(
         function (sites) {
            var siteJson = JSON.parse(sites.data[0].siteData);
            $scope.sites = siteJson;
         }
      );
      
      return vm;
}]);
