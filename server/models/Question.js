var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var questionSchema = mongoose.Schema({
    
    Title: [{
            Lang: String,
            Text: String
    }],

    Answers: [
        {
            Answer: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Answer'
            }
        }
    ],    
    Confirmed: Boolean,
    Type: String,
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

var question = mongoose.model('Question', questionSchema);


function createDefaultQuestions() {
    question.find({}).exec(function (err1, col) {
        if (col.length === 0) {
            
            question.create({                
                Name: "Title",
                Type : "C",
                Confirmed: true,
                Deleted: false                                        
            });
            
            question.create({
                Name: [{ "Text": "Giza" , "Lang": "en" }, { "Text": "«·ÃÌ“…" , "Lang": "ar" }],
                Confirmed: true,
                Deleted: false       
            });
            
        }
    });
            
        
};



exports.createDefaultQuestions = createDefaultQuestions;
