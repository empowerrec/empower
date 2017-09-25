var mongoose = require('mongoose');

var CompanyTypeSchema = mongoose.Schema({
    
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
    }, Deleted : Boolean  ,   
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},    
{
    timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
});

var CompanyType = mongoose.model('CompanyType', CompanyTypeSchema);


function createDefaultCompanyTypes() {
    CompanyType.find({}).exec(function (err1, col) {
        if (col.length === 0) {
            
            CompanyType.create({
                Deleted : false, 
                Name: [{ "Text": "Retail" , "Lang": "en" }, { "Text": "„ ⁄œœ… «·Ã‰”Ì« " , "Lang": "ar" }]                        
            });
            
            CompanyType.create({
                Deleted : false, 
                Name: [{ "Text": "Constructions" , "Lang": "en" }, { "Text": "«ﬁ·Ì„Ì…" , "Lang": "ar" }]                       
            });

            CompanyType.create({
                Deleted: false,
                Name: [{ "Text": "Healthcare, Hospitals, medical Services", "Lang": "en" }, { "Text": "„ ⁄œœ… «·Ã‰”Ì« ", "Lang": "ar" }]
            });

            CompanyType.create({
                Deleted: false,
                Name: [{ "Text": "Others", "Lang": "en" }, { "Text": "«ﬁ·Ì„Ì…", "Lang": "ar" }]
            });
        }
    });
            
        
};



exports.createDefaultCompanyTypes = createDefaultCompanyTypes;
