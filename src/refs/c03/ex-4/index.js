/* 
* @Author: Gowri Shankar
* @Date:   2016-01-09 18:47:20
* @Last Modified by:   Gowri Shankar
* @Last Modified time: 2016-01-09 18:54:02
*/

'use strict';

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

var userSchema = new mongoose.Schema({
	name: String
});

var User = mongoose.model('User', userSchema);

myUserFunction(User);

function(myUserFunction(User) {
	User.create({name: 'John'}, function(error, doc) {
		console.log(require('util').inspect(doc));
	});
}