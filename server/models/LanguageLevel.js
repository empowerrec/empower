var mongoose = require('mongoose');

var LanguageLevelSchema = mongoose.Schema({
    
    Name: [{
            Lang: String,
            Text: String,
            Descrption : String
    }],
    Percent : Number,
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
                Name: [{ "Text": "Basic (I can have a simple conversation and understand the written language)", "Lang": "en", "Descrption":"I can have a simple conversation and understand the written language" }, { "Text": "„„ «“" , "Lang": "ar" }]
                        
                    });

                    LanguageLevel.create({
                        Deleted: false,
                        Name: [{ "Text": "Working knowledge (I can use the language for business, read documents and be interviewed)", "Lang": "en", "Descrption": "I can use the language for business, read documents and be interviewed" }, { "Text": "„„ «“", "Lang": "ar" }]

                    });
                    LanguageLevel.create({
                        Deleted: false,
                        Name: [{ "Text": "Fluent (I can read, write and speak fluently in this language without any mistakes)", "Lang": "en", "Descrption": "I can read, write and speak fluently in this language without any mistakes" }, { "Text": "„„ «“", "Lang": "ar" }]

                    });

                    LanguageLevel.create({
                        Deleted: false,
                        Name: [{ "Text": "Native (Mother tongue)", "Lang": "en", "Descrption": "Mother tongue" }, { "Text": "„„ «“", "Lang": "ar" }]

                    });

                }; 
            
    });
};
   
    


exports.createDefaultLanguageLevels = createDefaultLanguageLevels;
