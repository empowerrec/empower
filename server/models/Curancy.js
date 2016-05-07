var mongoose = require('mongoose');

var CurancySchema = mongoose.Schema({

    CurancyName:
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
var Curancy = mongoose.model('Curancy', CurancySchema);

function createDefaultCurancies() {
    Curancy.find({}).exec(function(err, col) {
        if (col.length === 0) {

            Curancy.create({
                CurancyName: [{"Text":"Egyptien Pound" , "Lang":"en"},{"Text":"جنيه مصرى" , "Lang":"ar"}]

          });


            Curancy.create({
                CurancyName: [{"Text":"US Dollar" , "Lang":"en"},{"Text":"دولار أمريكى" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultCurancies = createDefaultCurancies;
