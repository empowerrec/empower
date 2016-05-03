var mongoose = require('mongoose');

var TrainingCenterSchema = mongoose.Schema({
    
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
    }
},    
{
    timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
});

var TrainingCenter = mongoose.model('TrainingCenter', TrainingCenterSchema);


function createDefaultTrainingCenters() {
            TrainingCenter.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    TrainingCenter.create({
                Name: [{ "Text": "Global Knowledge" , "Lang": "en" }, { "Text": "Global Knowledge" , "Lang": "ar" }]
                        
                    });
                    
                    TrainingCenter.create({
                Name: [{ "Text": "IT Share" , "Lang": "en" }, { "Text": "IT Share" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultTrainingCenters = createDefaultTrainingCenters;
