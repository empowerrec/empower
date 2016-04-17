var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var citySchema = mongoose.Schema({
    
    Name: [{
            Language: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Language'
            },
            Text: String
        }],
    Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
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

var City = mongoose.model('City', citySchema);
var Country = mongoose.model('Country');

function createDefaultCities() {
    
    Country.find({}).exec(function (err, country) {
        if (country.length !== 0) {
            
            City.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    City.create({
                        Name: "Cairo",
                        Country: encryption.searchAtJson(country, "Name", "Egypt", "_id")
                    });
                    
                    City.create({
                        Name: "Washengton DC",
                        Country: encryption.searchAtJson(country, "Name", "United States", "_id")
                    });
                }
            });

        }
    });
    
}

exports.createDefaultCities = createDefaultCities;
