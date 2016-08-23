var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');



var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(user) {
    var username = user.username;
    this.set('username', username);
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, function(err, hash) {
        if (err) {
          console.log('Error: ', err);
        } else {
          var row = {'username': username, 'password': hash};
// begin session if new user is created
          db.knex.insert(row).into('users').then(function(id) {
            console.log(id + ' the id has arrived');
          });

        }
      });
    });
  }
});

User.getPassword = function(name, pwd, callback) {
  db.knex('users').where({
    username: name
  }).select('password').then(function(rows) {
    if (!rows[0]) {
      callback(null);
    } else {
      bcrypt.compare(pwd, rows[0].password, function(err, res) {
        if (err) {
          console.log('Error: bcrypt comparrison error - ', err);
        }
// make session if res is true
  // the users id from table        
        callback(res);
      });
    }
  });
};

module.exports = User;
