var mongoose = require('mongoose');

var UserFeatureSchema = mongoose.Schema({
    Points: {
        type: Number
    },
    DistrbuitedForSubUsers: {
        type: Number
    },
    UsedFromPoints: {
        type: Number
    },
    FeatureType: { type: String },
    ExpiryDate: { type: Date },
    Package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
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

var UserFeature = mongoose.model('UserFeature', UserFeatureSchema);


function createDefaultUserFeatures() {
    UserFeature.find({}).exec(function (err1, col) {
        if (col.length === 0) {

        }
    });


};

exports.createDefaultUserFeatures = createDefaultUserFeatures;
