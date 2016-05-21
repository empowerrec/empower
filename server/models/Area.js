var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var areaSchema = mongoose.Schema({
    Name: [{
            Lang: String,
            Text: String
        }],
    City: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
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

var Area = mongoose.model('Area', areaSchema);
var City = mongoose.model('City');

function createDefaultAreas() {
    
    City.find({}).exec(function (err, city) {
        if (city.length !== 0) {
            
            Area.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    //Area.create({
                    //    Name: [{ "Text": "Obour" , "Lang": "en" }, { "Text": "«·⁄»Ê—" , "Lang": "ar" }],
                    //    City: encryption.searchAtJson(city, "Name", "Cairo", "_id")
                    //});
                    
                    //Area.create({
                    //    Name: [{ "Text": "10Th Of Ramadan" , "Lang": "en" }, { "Text": "«·⁄«‘— „‰ —„÷«‰" , "Lang": "ar" }],
                    //    City: encryption.searchAtJson(city, "Name.Text", "Cairo", "_id")
                    //});
                }
            });

        }
    });
    
}

exports.createDefaultAreas = createDefaultAreas;
