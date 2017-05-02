var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var answerSchema = mongoose.Schema({
    
    Title: [{
            Lang: String,
            Text: String
        }],    
    Confirmed : Boolean,
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

var answer = mongoose.model('Answer', answerSchema);


function createDefaultanswers() {
    answer.find({}).exec(function (err1, col) {
        if (col.length === 0) {
            
            //answer.create({                
            //    Name: [{ "Text": "Cairo" , "Lang": "en" }, { "Text": "«·ﬁ«Â—Â" , "Lang": "ar" }],
            //    Confirmed: true,
            //    Deleted: false                                        
            //});
            
            //answer.create({
            //    Name: [{ "Text": "Giza" , "Lang": "en" }, { "Text": "«·ÃÌ“…" , "Lang": "ar" }],
            //    Confirmed: true,
            //    Deleted: false       
            //});
            
        }
    });
            
        
};



exports.createDefaultanswers = createDefaultanswers;
