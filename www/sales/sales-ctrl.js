(function () {
    'use strict';

	angular.module('bizapp')
	.controller('SalesCtrl', ['$scope', '$http', GetSalesInvoices]);
	
    function GetSalesInvoices($scope, $http) {
		$scope.invoices = [];
		$scope.refresh = function() {
			var url = "https://start.exactonline.com/api/v1/21600/salesinvoice/SalesInvoices";
			$http.get(url)
			  .success(function(data) {
				$scope.invoices = data.d.results;
				console.log(data.d)
			  })
			  .error(function(){
				  console.log('opss')
			  })
			  .finally(function() {
			   $scope.$broadcast('scroll.refreshComplete');
			 });
		}
    }
})();

