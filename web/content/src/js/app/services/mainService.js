/* global angular */

angular.module('StackExchangeEditNotifier')
    .service('mainService', ['$http', function ($http) {
        
        function getStackExchangeSites() {
            return $http({
                method: 'GET',
                url: '/GetAllSites',
            });
        }
        
        return {
            GetStackExchangeSites: getStackExchangeSites,  
        };
        
    }]);
