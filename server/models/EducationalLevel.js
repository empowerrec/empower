var mongoose = require('mongoose');

var educationalLevelSchema = mongoose.Schema({

  LevelName:
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
var EducationalLevel = mongoose.model('EducationalLevel', educationalLevelSchema);

function createDefaultEducationalLevels() {
    EducationalLevel.find({}).exec(function(err, col) {
        if (col.length === 0) {

            EducationalLevel.create({
                LevelName: [{"Text":"Universty" , "Lang":"en"},{"Text":"جامعى" , "Lang":"ar"}]

          });


            EducationalLevel.create({
                LevelName: [{"Text":"أHighSchool" , "Lang":"en"},{"Text":"ثانوى" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultEducationalLevels = createDefaultEducationalLevels;
