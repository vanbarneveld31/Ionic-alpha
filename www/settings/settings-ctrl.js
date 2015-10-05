(function () {
    'use strict';

	angular.module('bizapp')
	.controller('SettingsCtrl', ['$scope', '$state', SettingsCtrl]);
    function SettingsCtrl($scope, $state, bizapp) {
        var vm = this;
		$scope.settings = {
			autoLogin: true
		};
    };
})();
