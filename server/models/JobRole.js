var mongoose = require('mongoose');

var JobRoleSchema = mongoose.Schema({
    Name:
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
}, Deleted : Boolean  ,   
    DeletedBy: {
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
                Deleted : false, 
                Name: [{"Text":"Administraion" , "Lang":"en"},{"Text":"اداري" , "Lang":"ar"}]

          });


            JobRole.create({
                Deleted : false, 
                Name: [{"Text":"Banking" , "Lang":"en"},{"Text":"ايداع" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultJobRoles = createDefaultJobRoles;
