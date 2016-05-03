var mongoose = require('mongoose');

var CarLicenceTypeSchema = mongoose.Schema({
    
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
    }
},
    {
    timestamps: { createdAt: 'CreatedAt' , updatedAt: "UpdatedAt" }
});

var CarLicenceType = mongoose.model('CarLicenceType', CarLicenceTypeSchema);

function createDefaultCarLicenceTypes() {
    CarLicenceType.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            CarLicenceType.create({
                Name: [{ "Text": "Private" , "Lang": "en" }, { "Text": "خاصة" , "Lang": "ar" }]
            });
            
            
            CarLicenceType.create({
                Name: [{ "Text": "First Class" , "Lang": "en" }, { "Text": "درجة أولى" , "Lang": "ar" }]
            });
        }
    });
}

exports.createDefaultCarLicenceTypes = createDefaultCarLicenceTypes;
