var Role = require('mongoose').model('Role');

exports.getRoles = function(req, res) {
  Role.find({}).exec(function(err, col) {
    res.send(col);
  });
};

exports.getRoleById = function(req, res) {
  Role.findOne({
    _id: req.params.id
  }).exec(function(err, col) {
    res.send(col);
  });
};

exports.getRoleByRoleName = function(req, res) {
  Role.findOne({
    RoleName: req.params.roleName
  }).exec(function(err, col) {
    res.send(col);
  });
};

/*
exports.createRole = function(req, res, next) {
  var roleData = req.body;
  roleData.RoleName = roleData.RoleName.toLowerCase();
  roleData.RoleDescription = roleData.RoleDescription;
  Role.create(roleData, function(err, role) {
    if (err) {
      if (err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Role Name');
      }
      res.status(400);

      return res.send({
        reason: err.toString()
      });
    }
    req.logIn(role, function(err) {
      if (err) {
        return next(err);
      }
      res.send(role);
    });
  });
};

exports.updateRole = function(req, res, next) {
  var roleUpdates = req.body;
  if (req.role._id !== roleUpdates._id && !req.user.hsaRole('admin')) {
    res.status(403);
    return res.end();
  }

  req.role.RoleName = roleUpdates.RoleName.toLowerCase();
  req.role.RoleDescription = roleUpdates.RoleDescription;

  req.role.save(function(err, role) {
    if (err) {
      if (err.toString().indexOf('E11000') > -1) {
        err = new Error('Duplicate Role Name');
      }
      res.status(400);
      return res.send({
        reason: err.toString()
      });
    }
    res.send(req.role);
  });
};

*/
