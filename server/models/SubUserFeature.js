var mongoose = require('mongoose');

var SubUserFeatureSchema = mongoose.Schema({
    Points: {
        type: Number
    },
    UsedFromPoints: {
        type: Number
    },

    Feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature'
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
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

var SubUserFeature = mongoose.model('SubUserFeature', SubUserFeatureSchema);


function createDefaultSubUserFeatures() {
    SubUserFeature.find({}).exec(function (err1, col) {
        if (col.length === 0) {

        }
    });


};

exports.createDefaultSubUserFeatures = createDefaultSubUserFeatures;
