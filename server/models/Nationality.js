var mongoose = require('mongoose');

var NationalitySchema = mongoose.Schema({

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


var Nationality = mongoose.model('Nationality', NationalitySchema);

function createDefaultNationalities() {
    Nationality.find({}).exec(function(err, col) {
        if (col.length === 0) {

            Nationality.create({
                Deleted : false, 
                Name: [{"Text":"Egyptien" , "Lang":"en"},{"Text":"مصرى" , "Lang":"ar"}]

          });


            Nationality.create({
                Deleted : false, 
                Name: [{"Text":"USA" , "Lang":"en"},{"Text":"أمريكى" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultNationalities = createDefaultNationalities;
