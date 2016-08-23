var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(user) {
    var username = user.username;
    var password = user.password;
    console.log( username, password, 'name name ' );
    this.set('username', username);
    this.set('password', password);
  }
});

module.exports = User;