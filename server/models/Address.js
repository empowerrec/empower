var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var addressSchema = mongoose.Schema({    
Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },

City: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    Area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area'
    },
    AddressLine1: String,
    AddressLine2: String,

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

var Address = mongoose.model('Address', addressSchema);


function createDefaultAddresss() {
    
    Address.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    Address.create({
                AddressLine1 : "AddressLine1",
                AddressLine2 : "AddressLine2"
                    });
                    
                    Address.create({
                AddressLine1 : "AddressLine1",
                AddressLine2 : "AddressLine2"
                    });
                }
            });

        
    
    
}

exports.createDefaultAddresss = createDefaultAddresss;
