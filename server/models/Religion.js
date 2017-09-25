var mongoose = require('mongoose');

var ReligionSchema = mongoose.Schema({

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

var Religion = mongoose.model('Religion', ReligionSchema);

function createDefaultReligions() {
    Religion.find({}).exec(function(err, col) {
        if (col.length === 0) {

            Religion.create({
                Deleted : false, 
                Name: [{
                    "Text": "Islam" , "Lang":"en"},{"Text":"مسلم" , "Lang":"ar"}]

          });


            Religion.create({
                Deleted : false, 
                Name: [{
                    "Text": "Christianity" , "Lang":"en"},{"Text":"مسيحي" , "Lang":"ar"}]

            });

            Religion.create({
                Deleted: false,
                Name: [{
                    "Text": "Judaism", "Lang": "en" }, { "Text": "يهودي", "Lang": "ar" }]

            });


            Religion.create({
                Deleted: false,
                Name: [{ "Text": "Other", "Lang": "en" }, { "Text": "اخري", "Lang": "ar" }]

            });
    }
  });
}

exports.createDefaultReligions = createDefaultReligions;
