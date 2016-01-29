exports.AddToFavsController = function($scope, $http, $user, $timeout) {
	$scope.addToFavs = function(product) {
		var obj = {
			product: product._id,
			quantity: 1
		};

		$user.user.data.cart.push(obj);

		$http.
			put('/api/v1/me/cart', {
				data: {
					data: {
						cart: $user.user.data.cart
					}
				}
			}).
			success(function(data) {
				$user.loadUser();
				$scope.success = true;

				$timeout(function() {
					$scope.success = false;					
				}, 5000);
			});
	};
};


exports.CategoryProductsController = function($scope, $routeParams, $http) {
	var encoded = encodeURIComponent($routeParams.category);

	$scope.price = undefined;

	$scope.handlePriceClick = function() {
		if($scope.price === undefined) {
			$scope.price = -1;

		} else {
			$scope.price = 0 - $scope.price;
		}
		$scope.load();
	};

	$scope.load = function() {
		var queryParams = {
			price: $scope.price
		};
		$http.
			get('/api/v1/product/category/' + encoded, {
				params: queryParams
			}).
			success(function(data) {
				$scope.products = data.products;
			});

	};

	$scope.load();

	setTimeout(function() {
		$scope.$emit('CategoryProductsController');
	}, 0);
};

exports.CategoryTreeController = function($scope, $routeParams, $http) {
	var encoded = encodeURIComponent($routeParams.category);
	$http.
		get('/api/v1/category/id/' + encoded).
		success(function(data) {
			$scope.category = data.category;
			$http.
				get('/api/v1/category/parent/' + encoded).
				success(function(data) {
					$scope.children = data.categories;
				});
		});

		setTimeout(function() {
			$scope.$emit('CategoryTreeController');
		}, 0);
};

exports.CheckoutController = function($scope, $user, $http) {
	$scope.user = $user;

	$scope.updateCart = function() {
		$http.
			put('/api/v1/me/cart/', $user.user).
			success(function(data) {
				$scope.updated = true;
			});
	};

	Stripe.setPublishableKey('pk_test_ZXEKveU9MPrqWa3TUJWfcE2f');

	$scope.stripeToken = {
		number: '4242424242424242',
		cvc: '123',
		exp_month: '12',
		exp_year: '2017'
	};

	$scope.checkout = function() {
		$scope.error = null;
		Stripe.card.createToken($scope.stripeToken, function(status, response) {
			if(status.error) {
				$scope.error = status.error;
				return;
			}

			$http.
				post('/api/v1/checkout', {
					stripeToken: response.id
				}).
				success(function(data) {
					$scope.checkedOut = true;
					$user.user.data.cart = [];
				});
		});
	};
};

exports.UserMenuController = function($scope, $user) {
	$scope.user = $user;

	setTimeout(function() {
		$scope.$emit('UserMenuController');
	}, 0);
};


exports.ProductDetailsController = function($scope, $routeParams, $http) {
	var encoded = encodeURIComponent($routeParams.id);

	$http.
		get('/api/v1/product/id/' + encoded).
		success(function(data) {
			$scope.product = data.product;
		});

	setTimeout(function() {
		$scope.$emit('ProductDetailsController');
	}, 0);
};