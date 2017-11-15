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
	$scope.reset = function()
	{
		var url = "traffic";
		$.ajax({
		url:url,
		type: "DELETE",
		success: function(data,textstatus)
		{
			var everything="<ul id='fred'></ul>";
	                $("fred").html(everything);
			window.location.reload(true);
		//	trafficFetcher.get()
		}
		})
	}
	$scope.addTraffic = function() {
		var formData={Time:$scope.Time,Location:$scope.Location,Description:$scope.Description};
		console.log(formData);
		trafficFetcher.post(formData);
		$scope.traffic.push(formData);
		$scope.Time='';
		$scope.Location='';
		$scope.Description='';
	}
	trafficFetcher.get()
	  .then(function (data) {
		$scope.traffic = data
	})
}
