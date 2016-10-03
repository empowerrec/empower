var mongoose = require('mongoose');

var JobTypeSchema = mongoose.Schema({
    Name: [{
            Lang: String,
            Text: String
        }]
    ,
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


var JobType = mongoose.model('JobType', JobTypeSchema);

function createDefaultJobTypes() {
    JobType.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            JobType.create({
                Deleted : false,
                Name: [{ "Text": "Full Time" , "Lang": "en" }, { "Text": "باجر كامل" , "Lang": "ar" }]
            });
            
            JobType.create({
                Deleted : false,
                Name: [{ "Text": "Part Time" , "Lang": "en" }, { "Text": "نصف اجر" , "Lang": "ar" }]
            });
        }
    });
}

exports.createDefaultJobTypes = createDefaultJobTypes;
