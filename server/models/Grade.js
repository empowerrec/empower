var mongoose = require('mongoose');

var GradeSchema = mongoose.Schema({
    
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

var Grade = mongoose.model('Grade', GradeSchema);


function createDefaultGrades() {
            Grade.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    Grade.create({
                Name: [{ "Text": "Exxlent" , "Lang": "en" }, { "Text": "„„ «“" , "Lang": "ar" }]
                        
                    });
                    
                    Grade.create({
                Name: [{ "Text": "Very Good" , "Lang": "en" }, { "Text": "ÃÌœ Ãœ«" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultGrades = createDefaultGrades;
