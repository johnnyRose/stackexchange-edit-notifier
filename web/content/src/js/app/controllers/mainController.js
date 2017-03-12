/* global angular */

angular.module('StackExchangeEditNotifier', ['ngSanitize', 'ui.select'])
   .controller('mainController', ['mainService', '$http', function (mainService, $http) {

      var vm = this;

      mainService.GetStackExchangeSites().then(
         function (sites) {
            vm.sites = JSON.parse(sites.data[0].siteData);
         }
      );
      
      vm.submit = function () {
         var form = {
            site: vm.s && vm.s.selected.api_site_parameter,
            userId: vm.userId,
            email: vm.email,
         };
         
         if (form.site && form.userId && form.email) {
            $http.post('/', form).then(
               function (response) {
                  if (response.data.success) {
                     vm.formSubmitted = true;
                  }
               }
            );
         }
      };
      
      return vm;
}]);
