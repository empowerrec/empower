var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var packageSchema = mongoose.Schema({
    
    Name: [{
            Lang: String,
            Text: String
        }],    
    Type: { type: String },
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

var package = mongoose.model('Package', packageSchema);


function createDefaultPackages() {
    
    package.find({}).exec(function (err1, col) {
        if (col.length === 0) {
            
            package.create({
                Deleted : false, 
                Name: [{ "Text": "Silver", "Lang": "en" }, { "Text": "???", "Lang": "ar" }],
            });
            
            package.create({
                Deleted : false, 
                Name: [{ "Text": "Gold", "Lang": "en" }, { "Text": "????", "Lang": "ar" }],
            });
        }
    });        
        
}

exports.createDefaultPackages = createDefaultPackages;
