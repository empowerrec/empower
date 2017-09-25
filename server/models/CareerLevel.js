var mongoose = require('mongoose');

var careerLevelSchema = mongoose.Schema({
    
    Name: [{
            Lang: String,
            Text: String,
            Descrption: String
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
                Deleted : false, 
                Name: [{ "Text": "Student/ Internship(I am a student or recent graduate with and search for part-time job or internship)", "Lang": "en", "Descrption":"I am a student or recent graduate with and search for part-time job or internship" }, { "Text": "طالب" , "Lang": "ar" }]
            });
            
            CareerLevel.create({
                Deleted: false,
                Name: [{ "Text": "Junior Professional(I have 1-3 years of full-time work experience)", "Lang": "en", "Descrption": "I have 1-3 years of full-time work experience" }, { "Text": "طالب", "Lang": "ar" }]
            });
            CareerLevel.create({
                Deleted: false,
                Name: [{ "Text": "Experienced professional / Senior (I have more than 4 years of experience and am an expert in my field)", "Lang": "en", "Descrption": "I have more than 4 years of experience and am an expert in my field" }, { "Text": "طالب", "Lang": "ar" }]
            });

            CareerLevel.create({
                Deleted: false,
                Name: [{ "Text": "Supervisor (I manage a team as my subordinates and have more than 6 years of experience)", "Lang": "en", "Descrption": "I manage a team as my subordinates and have more than 6 years of experience" }, { "Text": "طالب", "Lang": "ar" }]
            });

            CareerLevel.create({
                Deleted: false,
                Name: [{ "Text": "Manager (I manage a function / Section and have more than 10 years of experience)", "Lang": "en", "Descrption": "I manage a function / Section and have more than 10 years of experience" }, { "Text": "طالب", "Lang": "ar" }]
            });

            CareerLevel.create({
                Deleted: false,
                Name: [{ "Text": "Top Management / Director (I run the business or direct a group of managers in the organization and have more than 20 years of experience)", "Lang": "en", "Descrption": "I run the business or direct a group of managers in the organization and have more than 20 years of experience" }, { "Text": "طالب", "Lang": "ar" }]
            });

            
        }
    });
}

exports.createDefaultCareerLevels = createDefaultCareerLevels;
