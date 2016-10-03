var mongoose = require('mongoose');

var FacultySchema = mongoose.Schema({
    
    Name: [{
            Lang: String,
            Text: String
        }],
    Confirmed : Boolean  ,
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

var Faculty = mongoose.model('Faculty', FacultySchema);


function createDefaultFaculties() {
            Faculty.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    Faculty.create({
                Deleted : false,
                Name: [{ "Text": "Sience Faculty" , "Lang": "en" }, { "Text": "ﬂ·Ì… «·⁄·Ê„" , "Lang": "ar" }]
                        
                    });
                    
                    Faculty.create({
                Deleted : false,
                Name: [{ "Text": "Enginering Faculty" , "Lang": "en" }, { "Text": "ﬂ·Ì… «·⁄·Ê„" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultFaculties = createDefaultFaculties;
