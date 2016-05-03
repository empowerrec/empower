var mongoose = require('mongoose');

var EducationTypeSchema = mongoose.Schema({
    
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
    }
},    
{
    timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
});

var EducationType = mongoose.model('EducationType', EducationTypeSchema);


function createDefaultEducationTypes() {
            EducationType.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    EducationType.create({
                Name: [{ "Text": "Univirsty" , "Lang": "en" }, { "Text": "ÌÇãÚì" , "Lang": "ar" }]
                        
                    });
                    
                    EducationType.create({
                Name: [{ "Text": "Secondry" , "Lang": "en" }, { "Text": "ËÇäæì" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultEducationTypes = createDefaultEducationTypes;
