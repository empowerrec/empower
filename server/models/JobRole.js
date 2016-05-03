var mongoose = require('mongoose');

var JobRoleSchema = mongoose.Schema({
    JobRoleName:
      [{
          Lang: String,
          Text: String
      }]
  ,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
}
},
    {
        timestamps: { createdAt: 'CreatedAt' , updatedAt:"UpdatedAt" }
    });


var JobRole = mongoose.model('JobRole', JobRoleSchema);

function createDefaultJobRoles() {
    JobRole.find({}).exec(function(err, col) {
        if (col.length === 0) {

            JobRole.create({
                JobRoleName: [{"Text":"Administraion" , "Lang":"en"},{"Text":"اداري" , "Lang":"ar"}]

          });


            JobRole.create({
                JobRoleName: [{"Text":"Banking" , "Lang":"en"},{"Text":"ايداع" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultJobRoles = createDefaultJobRoles;
