'use strict';

// Controller
var account = require('./controllers/accountCtrl.js');

account.create({
  name: 'Github',
  username: 'philippschulte',
  password: 'thisIsMySecret'
});

var GitHub = account.read('Github');
console.log(GitHub);
