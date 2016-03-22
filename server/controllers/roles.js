var Role = require('mongoose').model('Role');

exports.getRoles = function(req, res) {
  Role.find({}).exec(function(err, col) {
      res.send(col);
  });
};

exports.getRoleById = function(req, res) {
  Role.findOne({_id: req.params.id}).exec(function(err, col) {
    res.send(col);
  });
};

exports.getRoleByRoleName = function(req, res) {
  Role.findOne({RoleName: req.params.roleName}).exec(function(err, col) {
    res.send(col);
  });
};
