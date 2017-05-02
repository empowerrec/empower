var mongoose = require('mongoose');

var FeatureSchema = mongoose.Schema({

    Name: [{
        Lang: String,
        Text: String
    }],
    Code: {
        type: Number
    },
    Type: { type: String },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, Deleted: Boolean,
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
    });

var Feature = mongoose.model('Feature', FeatureSchema);


function createDefaultFeatures() {
    Feature.find({}).exec(function (err1, col) {
        if (col.length === 0) {

        }
    });


};

exports.createDefaultFeatures = createDefaultFeatures;
