var mongoose = require('mongoose');

var industrySchema = mongoose.Schema({
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

var Industry = mongoose.model('Industry', industrySchema);

function createDefaultIndustry() {
    Industry.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            Industry.create({
                Deleted : false,
                Name: [{ "Text": "Information Technology Services" , "Lang": "en" }, { "Text": "����� ��������� ���������" , "Lang": "ar" }]
            });
            
            Industry.create({
                Deleted : false,
                Name: [{ "Text": "Computer Software" , "Lang": "en" }, { "Text": "����� ����������" , "Lang": "ar" }]

            });
          
        }
    });
}

exports.createDefaultIndustry = createDefaultIndustry;