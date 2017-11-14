var app = window.angular.module('app',[])

app.factory('trafficFetcher', trafficFetcher)
app.controller('MainCtrl', mainCtrl)

function trafficFetcher ($http)
{
 var API_ROOT = 'traffic'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
        post: function (formData) {
      return $http
         .post(API_ROOT,formData)
         .then(function (resp) {
           console.log("Post worked");
         })
    }
  }
}

function mainCtrl ($scope,trafficFetcher)
{
	$scope.traffic = []
	$scope.addTraffic = function() {
		var formData={Time:$scope.Time,Location:$scope.Location,Description:$scope.Description};
		console.log(formData);
		trafficFetcher.post(formData);
		$scope.traffic.push(formData);
	}
	trafficFetcher.get()
	  .then(function (data) {
		$scope.traffic = data
	})
}
