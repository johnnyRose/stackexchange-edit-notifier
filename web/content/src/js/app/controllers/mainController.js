/* global angular */

angular.module('StackExchangeEditNotifier', [])
   .controller('mainController', ['$scope', 'mainService', function ($scope, mainService) {
      $scope.greeting = "Hello World";
      
      var vm = this;
       
      mainService.GetStackExchangeSites().then(
         function (sites) {
            var siteJson = JSON.parse(sites.data[0].siteData);
            console.log(siteJson); 
            $scope.sites = siteJson;
         }
      );
      
      return vm;
}]);
