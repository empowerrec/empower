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
                Name: [{ "Text": "Full Time Employee" , "Lang": "en" }, { "Text": "باجر كامل" , "Lang": "ar" }]
            });
            


            JobType.create({
                Deleted: false,
                Name: [{ "Text": "Part Time Employee", "Lang": "en" }, { "Text": "نصف اجر", "Lang": "ar" }]
            });

            JobType.create({
                Deleted: false,
                Name: [{ "Text": "Temporary Employee", "Lang": "en" }, { "Text": "Temporary Employee", "Lang": "ar" }]
            });

            JobType.create({
                Deleted: false,
                Name: [{ "Text": "Internship", "Lang": "en" }, { "Text": "Internship", "Lang": "ar" }]
            });

            JobType.create({
                Deleted: false,
                Name: [{ "Text": "Freelancer", "Lang": "en" }, { "Text": "Freelancer", "Lang": "ar" }]
            });

            JobType.create({
                Deleted: false,
                Name: [{ "Text": "Volunteer", "Lang": "en" }, { "Text": "Volunteer", "Lang": "ar" }]
            });
        }
    });
}

exports.createDefaultJobTypes = createDefaultJobTypes;
