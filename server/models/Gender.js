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
}, Deleted : Boolean  ,   
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: { createdAt: 'CreatedAt' , updatedAt:"UpdatedAt" }
    });

var Gender = mongoose.model('Gender', GenderSchema);

function createDefaultGenders() {
    Gender.find({}).exec(function(err, col) {
        if (col.length === 0) {

            Gender.create({
                Deleted : false,
                Name: [{"Text":"Male" , "Lang":"en"},{"Text":"ذكر" , "Lang":"ar"}]

          });


            Gender.create({
                Deleted : false,
                Name: [{"Text":"Female" , "Lang":"en"},{"Text":"أنثى" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultGenders = createDefaultGenders;
