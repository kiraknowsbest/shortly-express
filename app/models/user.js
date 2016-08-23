var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(user) {
    var username = user.username;
    var password = user.password;
    var row = {'username': username, 'password': password, 'code': 'salt'};

    db.knex.insert(row).into('users').then(function(id) {
      console.log(id);
    }).finally(function() {
      //no args
    });

    console.log( username, password, 'name name ' );
    this.set('username', username);
    this.set('password', password);
  },


});

User.getPassword = function(name, callback) {
  db.knex('users').where({
    username: name
  }).select('password').then(function(rows) {
    if (!rows[0]) {
      callback(null);
    }
    console.log(rows[0], 'rows[0]');
    callback(rows[0].password);
  });
};

module.exports = User;
