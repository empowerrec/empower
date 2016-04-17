var mongoose = require('mongoose');

var languageSchema = mongoose.Schema({
        
    Name: {
        type: String
    },
    Abbreviation: {
        type: String
    },       
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

var Language = mongoose.model('Language', languageSchema);

function createDefaultLanguages() {
    Language.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            Language.create({
                Name: "ÚÑÈí",
                Abbreviation: "ar"
            });
            
            Language.create({
                Name: "English",
                Abbreviation: "en"
            });
        }
    });
}

exports.createDefaultLanguages = createDefaultLanguages;
