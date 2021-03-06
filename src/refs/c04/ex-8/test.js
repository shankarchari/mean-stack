describe('User Menu', function() {
	
	var injector;
	var element;
	var scope;
	var intercepts;
	var httpBackend;
	
	beforeEach(function() {

		injector = angular.injector(['mean-retail', 'ngMockE2E']);
		intercepts = {};

		injector.invoke(function($rootScope, $compile, $httpBackend) {
			scope = $rootScope.$new();

			$httpBackend.whenGET(/.*\/templates\/.*/i).passThrough();
			httpBackend = $httpBackend;

			element = $compile('<user-menu></user-menu>')(scope);
			scope.$apply();
		});
	});

	it('shows logged in users profile picture', function(done) {
		httpBackend.expectGET('/api/v1/me').respond({
			user: {
				profile: {
					picture: 'myPic'
				}
			}
		});

		scope.$on('UserMenuController', function() {
			assert.equal(element.find('.title').text().trim(), 'MEAN Retail');

			httpBackend.flush();
			assert.notEqual(element.find('.user-info .user').css('display'), 'none');
			assert.equal(element.find('.user-info .user img').attr('src'), 'myPic');
			done();
		});
	}); 
})