var mongoose = require('mongoose');

var industrySchema = mongoose.Schema({
    Description:
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
                Description: [{ "Text": "Information Technology Services" , "Lang": "en" }, { "Text": "Œœ„«   ﬂ‰Ê·ÊÃÌ« «·„⁄·Ê„« " , "Lang": "ar" }]
            });
            
            Industry.create({
                Description: [{ "Text": "Computer Software" , "Lang": "en" }, { "Text": "»—„Ã… «·ﬂÊ„»ÌÊ —" , "Lang": "ar" }]

            });
          
        }
    });
}

exports.createDefaultIndustry = createDefaultIndustry;