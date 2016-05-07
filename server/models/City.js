var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var citySchema = mongoose.Schema({
    
    Name: [{
            Lang: String,
            Text: String
        }],
    Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
Confirmed : Boolean  
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
    timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
});

var City = mongoose.model('City', citySchema);


function createDefaultCities() {
            City.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    City.create({
                Name: [{ "Text": "Cairo" , "Lang": "en" }, { "Text": "«·ﬁ«Â—…" , "Lang": "ar" }]
                        
                    });
                    
                    City.create({
                Name: [{ "Text": "Giza" , "Lang": "en" }, { "Text": "«·ÃÌ“Â" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultCities = createDefaultCities;
