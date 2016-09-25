var app = angular.module('myApp', []);

app.controller('mainCtrl', ['$scope', '$http', function($scope, $http){
	$scope.images = [];

	$http.get('/allPictures').success(function(data){
		angular.copy(data, $scope.images);
		console.log($scope.images);
	});

}]);

app.controller('homeCtrl', [ '$scope', '$http', function($scope, $http){

	$scope.quantity = 2;
	$scope.alert = "";
	$scope.comments = [];

	$scope.loadMore = function(){
		$scope.quantity += 4;

		setTimeout(function(){
          $('.comment-text').addClass('animated fadeInLeft').css('display', 'inherit');
          $('.comment-city').addClass('animated fadeInLeft').css('display', 'inherit');
          $('.comment-name').addClass('animated fadeInLeft').css('display', 'inherit');
        }, 1000);
	}

	var getAllComments = function(){
		return $http.get('/allComments').success(function(data){
			angular.copy(data, $scope.comments);
		});
	};

	var createComment = function(commentData){
		return $http.post('/saveComments', commentData).success(function(data){
			$scope.comments.unshift(data);
		});
	}

	$scope.writeComment = function(){
		if(!$scope.name){ $scope.alert = { message: 'fill in your name' }; return;}
		if(!$scope.city){ $scope.alert = { message: 'fill in your city' }; return;}
		if(!$scope.comment){ $scope.alert = { message: 'type your comment' }; return;}

		var data = {
				name: $scope.name, 
				city: $scope.city, 
				comment: $scope.comment
			}

		createComment(data);

		$scope.alert = {message: 'Thanks! We Appreciate Your Comments'}

		$scope.name = "";
		$scope.city = "";
		$scope.comment = "";
	}

	getAllComments(); //get comments

}]);

app.controller('addressCtrl', ['$scope', function($scope){
	$scope.success = "";
	$scope.error = "";

	$scope.emailUs = function(){
		if(!$scope.subject || $scope.subject == undefined  || $scope.subject == ""){ 
			$scope.error = { message: 'llene la seccion: Asunto' };
			return; 
		}

		if(!$scope.body || $scope.body == undefined || $scope.body == ""){
			$scope.error = { message: 'llene la seccion: Mensaje' };
			return; 
		}

		subject = encodeURIComponent($scope.subject);
		body = encodeURIComponent($scope.body);

		var link = "mailto:elparaisonievesyraspados@gmail.com?subject=";
		link += subject;
		link += '&body=';
		link += body;

		window.location.href = link;
		$scope.error = "";
		$scope.success = { message: 'Enviado' };

	}
}]);

app.controller('flavorsCtrl', ['$scope', function($scope){
	$scope.flavors = [
		{icecream: 'Beso de Angel'},
		{icecream: 'Capuccino'},
		{icecream: 'Coco'},
		{icecream: 'Chicle'},
		{icecream: 'Chocolate'},
		{icecream: 'Mamey'},
		{icecream: 'Mango'},
		{icecream: 'Nanche'},
		{icecream: 'Pistache'},
		{icecream: 'Guanavana'},
		{icecream: 'Vainilla'},
		{icecream: 'Caramelo'},
		{icecream: 'Chongos'},
		{icecream: 'Fresa'},
		{icecream: 'Fruta Seca'},
		{icecream: 'Guava'},
		{icecream: 'Gansito'},
		{icecream: 'Piñon'},
		{icecream: 'Queso'},
		{icecream: 'Rompope'},
		{icecream: 'Galleta'},
		{icecream: 'Limon'},
		{icecream: 'Tequila'},
		{icecream: 'Tamarindo'}
	];
}]);