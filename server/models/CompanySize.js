var mongoose = require('mongoose');

var CompanySizeSchema = mongoose.Schema({
    
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

var CompanySize = mongoose.model('CompanySize', CompanySizeSchema);


function createDefaultCompanySizes() {
    CompanySize.find({}).exec(function (err1, col) {
        if (col.length === 0) {
            
            CompanySize.create({
                Deleted : false, 
                Name: [{ "Text": "1-9 Employees" , "Lang": "en" }, { "Text": "דה 1 ַבל 10" , "Lang": "ar" }]                        
            });
            
            CompanySize.create({
                Deleted : false, 
                Name: [{ "Text": "10-49 Employees" , "Lang": "en" }, { "Text": "דה 10 ַבל 50" , "Lang": "ar" }]                       
            });

            CompanySize.create({
                Deleted: false,
                Name: [{ "Text": "50-99 Employees", "Lang": "en" }, { "Text": "דה 10 ַבל 50", "Lang": "ar" }]
            });

            CompanySize.create({
                Deleted: false,
                Name: [{ "Text": "100-499 Employees", "Lang": "en" }, { "Text": "דה 10 ַבל 50", "Lang": "ar" }]
            });

            CompanySize.create({
                Deleted: false,
                Name: [{ "Text": "500-999 Employees", "Lang": "en" }, { "Text": "דה 10 ַבל 50", "Lang": "ar" }]
            });

            CompanySize.create({
                Deleted: false,
                Name: [{ "Text": "1000-4999 Employees", "Lang": "en" }, { "Text": "דה 10 ַבל 50", "Lang": "ar" }]
            });

            CompanySize.create({
                Deleted: false,
                Name: [{ "Text": "More than 5000 Employees", "Lang": "en" }, { "Text": "דה 10 ַבל 50", "Lang": "ar" }]
            });
        }
    });
            
        
};



exports.createDefaultCompanySizes = createDefaultCompanySizes;
