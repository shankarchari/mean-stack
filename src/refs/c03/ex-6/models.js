/* 
* @Author: Gowri Shankar
* @Date:   2016-01-10 00:37:15
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-18 19:48:54
*/
var mongoose = require('mongoose');
var _ = require('underscore');

module.exports = function(wagner) {
	mongoose.connect('mongodb://localhost:27017/test');

	var Category = 
		mongoose.model('Category', require('./category'), 'categories');

	var Product = 
		mongoose.model('Product', require('./product'), 'products');

	var models = {
		Category: Category,
		Product: Product
	};

	_.each(models, function(value, key) {
		wagner.factory(key, function() {
			return value;
		});
	});

	return models;
};