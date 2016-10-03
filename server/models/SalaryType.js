var mongoose = require('mongoose');

var SalaryTypeSchema = mongoose.Schema({

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

var SalaryType = mongoose.model('SalaryType', SalaryTypeSchema);

function createDefaultSalaryTypes() {
    SalaryType.find({}).exec(function(err, col) {
        if (col.length === 0) {

            SalaryType.create({
                Deleted : false,
                Name: [{"Text":"Per Month" , "Lang":"en"},{"Text":"شهرى" , "Lang":"ar"}]
          });


            SalaryType.create({
                Deleted : false,
                Name: [{"Text":"Per Year" , "Lang":"en"},{"Text":"سنوى" , "Lang":"ar"}]

            });
    }
  });
}

exports.createDefaultSalaryTypes = createDefaultSalaryTypes;
