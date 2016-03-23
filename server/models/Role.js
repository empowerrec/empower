var mongoose = require('mongoose');

var roleSchema = mongoose.Schema({
  RoleName: {
    type: String,
    required: '{PATH} is required',
    unique: true
  },
  RoleDescription: {
    type: String,
    required: '{PATH} is required'
  }
});

var Role = mongoose.model('Role', roleSchema);

function createDefaultRoles(next) {
  Role.find({}).exec(function(err, col) {
    if (col.length === 0) {
      Role.create({
        RoleName: 'admin',
        RoleDescription: 'Admin of all Web Site'
      },function success(result) {
        next();
      });
    }
  });
}

exports.createDefaultRoles = createDefaultRoles;
