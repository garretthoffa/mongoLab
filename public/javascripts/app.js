angular.module('app',[])
.controller('MainCtrl',[
   '$scope','$http',
   function($scope,$http)
   {
	$scope.traffic =[];
	$scope.addTraffic = function()
	{
	};
	$scope.getAll = function() {
	 return http.get('/traffic').success(function(data){
          angular.copy(data, $scope.traffic);
	});
	$scope.getAll();
   	}
   }
   ]);
