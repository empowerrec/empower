var mongoose = require('mongoose');

var SpecializationSchema = mongoose.Schema({
    
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

var Specialization = mongoose.model('Specialization', SpecializationSchema);


function createDefaultSpecializations() {
            Specialization.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    Specialization.create({
                Deleted : false,
                Name: [{ "Text": "IT" , "Lang": "en" }, { "Text": " ﬂ‰Ê·ÊÃÌ« «·„⁄·Ê„« " , "Lang": "ar" }]
                        
                    });
                    
                    Specialization.create({
                Deleted : false,
                Name: [{ "Text": "CS" , "Lang": "en" }, { "Text": "⁄·Ê„ Õ«”»" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultSpecializations = createDefaultSpecializations;
