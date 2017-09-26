var mongoose = require('mongoose');

var TravelPreferenceSchema = mongoose.Schema({
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


var TravelPreference = mongoose.model('TravelPreference', TravelPreferenceSchema);

function createDefaultTravelPreferences() {
    TravelPreference.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            TravelPreference.create({
                Deleted : false,
                Name: [{ "Text": "None", "Lang": "en" }, { "Text": "None" , "Lang": "ar" }]
            });
            


            TravelPreference.create({
                Deleted: false,
                Name: [{ "Text": "10 % of Month", "Lang": "en" }, { "Text": "10 % of Month", "Lang": "ar" }]
            });

            TravelPreference.create({
                Deleted: false,
                Name: [{ "Text": "25 % of Month", "Lang": "en" }, { "Text": "25 % of Month", "Lang": "ar" }]
            });

            TravelPreference.create({
                Deleted: false,
                Name: [{ "Text": "50 % of Month", "Lang": "en" }, { "Text": "50 % of Month", "Lang": "ar" }]
            });

            TravelPreference.create({
                Deleted: false,
                Name: [{ "Text": "75 % of month", "Lang": "en" }, { "Text": "75 % of month", "Lang": "ar" }]
            });

            TravelPreference.create({
                Deleted: false,
                Name: [{ "Text": "100 % of Month", "Lang": "en" }, { "Text": "100 % of Month", "Lang": "ar" }]
            });
        }
    });
}

exports.createDefaultTravelPreferences = createDefaultTravelPreferences;
