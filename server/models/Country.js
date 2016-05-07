var mongoose = require('mongoose');

var countrySchema = mongoose.Schema({
    
    Name: [{
            Text: String,
            Lang: String
        }],
    Description: {
        type: String
    },     
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

var Country = mongoose.model('Country', countrySchema);

function createDefaultCountries() {
    Country.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            Country.create({
                Name: [{ "Text": "Egypt" , "Lang": "en" }, { "Text": "„’—" , "Lang": "ar" }]

            });
            
            
            Country.create({
                Name: [{ "Text": "Suadi Arabia" , "Lang": "en" }, { "Text": "«·”⁄ÊœÌ…" , "Lang": "ar" }]
                 
            });
        }
    });
}

exports.createDefaultCountries = createDefaultCountries;
