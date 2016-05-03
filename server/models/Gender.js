var mongoose = require('mongoose');

var GenderSchema = mongoose.Schema({

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
var Gender = mongoose.model('Gender', GenderSchema);

function createDefaultGenders() {
    Gender.find({}).exec(function(err, col) {
        if (col.length === 0) {

            Gender.create({
                Name: [{"Text":"Male" , "Lang":"en"},{"Text":"ذكر" , "Lang":"ar"}]

          });


            Gender.create({
                Name: [{"Text":"Female" , "Lang":"en"},{"Text":"أنثى" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultGenders = createDefaultGenders;
