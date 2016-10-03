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
                Name: [{ "Text": "1 To 10" , "Lang": "en" }, { "Text": "דה 1 ַבל 10" , "Lang": "ar" }]                        
            });
            
            CompanySize.create({
                Deleted : false, 
                Name: [{ "Text": "10 To 50" , "Lang": "en" }, { "Text": "דה 10 ַבל 50" , "Lang": "ar" }]                       
            });
        }
    });
            
        
};



exports.createDefaultCompanySizes = createDefaultCompanySizes;
