var mongoose = require('mongoose');

var educationalLevelSchema = mongoose.Schema({
    Name: [{
            Lang: String,
            Text: String
        }],
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    Deleted : Boolean,   
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
    timestamps: { createdAt: 'CreatedAt' , updatedAt: "UpdatedAt" }
});

var EducationalLevel = mongoose.model('EducationalLevel', educationalLevelSchema);

function createDefaultEducationalLevels() {
    EducationalLevel.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            EducationalLevel.create({
                Name: [{ "Text": "Universty" , "Lang": "en" }, { "Text": "جامعي" , "Lang": "ar" }]
            });
            
            EducationalLevel.create({
                Name: [{ "Text": "High School" , "Lang": "en" }, { "Text": "ثانوي" , "Lang": "ar" }]
            });
        }
    });
}

exports.createDefaultEducationalLevels = createDefaultEducationalLevels;
