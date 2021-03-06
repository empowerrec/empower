var mongoose = require('mongoose');

var MaritalStatusSchema = mongoose.Schema({

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

var MaritalStatus = mongoose.model('MaritalStatus', MaritalStatusSchema);

function createDefaultMaritalStatuss() {
    MaritalStatus.find({}).exec(function(err, col) {
        if (col.length === 0) {

            MaritalStatus.create({
                Deleted : false,
                Name: [{"Text":"Single" , "Lang":"en"},{"Text":"أعزب" , "Lang":"ar"}]

          });


            MaritalStatus.create({
                Deleted : false,
                Name: [{"Text":"Married" , "Lang":"en"},{"Text":"متزوج" , "Lang":"ar"}]

            });

            MaritalStatus.create({
                Deleted: false,
                Name: [{ "Text": " Divorced", "Lang": "en" }, { "Text": "متزوج", "Lang": "ar" }]

            });

            MaritalStatus.create({
                Deleted: false,
                Name: [{ "Text": "Widow(er)", "Lang": "en" }, { "Text": "متزوج", "Lang": "ar" }]

            });
    }
  });
}

exports.createDefaultMaritalStatuss = createDefaultMaritalStatuss;
