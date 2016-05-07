var mongoose = require('mongoose');

var careerLevelSchema = mongoose.Schema({

  CareerLevelName:
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

/*
employerSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encryption.hashPassword(this.Salt, passwordToMatch) === this.HashedPassword;
  },
  hasRole: function(role) {
      return this.UserType.indexOf(role) > -1;
  }
};
*/
var CareerLevel = mongoose.model('CareerLevel', careerLevelSchema);

function createDefaultCareerLevels() {
    CareerLevel.find({}).exec(function(err, col) {
        if (col.length === 0) {

            CareerLevel.create({
                CareerLevelName: [{"Text":"Student" , "Lang":"en"},{"Text":"طالب" , "Lang":"ar"}]

          });


            CareerLevel.create({
                CareerLevelName: [{"Text":"Entry Level" , "Lang":"en"},{"Text":"مبتدأ" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultCareerLevels = createDefaultCareerLevels;
