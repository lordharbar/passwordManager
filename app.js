'use strict';

// Dependencies
var validate = require('./utils/validate.js');

// Model
var account = require('./models/account.js');

// Command
var command = account._[0];

// Validation
validate(command, false);
