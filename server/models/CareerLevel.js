var mongoose = require('mongoose');

var careerLevelSchema = mongoose.Schema({
    
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
    timestamps: { createdAt: 'CreatedAt' , updatedAt: "UpdatedAt" }
});

var CareerLevel = mongoose.model('CareerLevel', careerLevelSchema);

function createDefaultCareerLevels() {
    CareerLevel.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            CareerLevel.create({
                Name: [{ "Text": "Student" , "Lang": "en" }, { "Text": "طالب" , "Lang": "ar" }]
            });
            
            
            CareerLevel.create({
                Name: [{ "Text": "Entry Level" , "Lang": "en" }, { "Text": "مبتدأ" , "Lang": "ar" }]
            });
        }
    });
}

exports.createDefaultCareerLevels = createDefaultCareerLevels;
