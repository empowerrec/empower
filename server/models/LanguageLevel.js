var mongoose = require('mongoose');

var LanguageLevelSchema = mongoose.Schema({
    
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

var LanguageLevel = mongoose.model('LanguageLevel', LanguageLevelSchema);


function createDefaultLanguageLevels() {
            LanguageLevel.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    LanguageLevel.create({
                Deleted : false,
                Name: [{ "Text": "Exxlent" , "Lang": "en" }, { "Text": "„„ «“" , "Lang": "ar" }]
                        
                    });
                    
                    LanguageLevel.create({
                Deleted : false,
                Name: [{ "Text": "Very Good" , "Lang": "en" }, { "Text": "ÃÌœ Ãœ«" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultLanguageLevels = createDefaultLanguageLevels;
