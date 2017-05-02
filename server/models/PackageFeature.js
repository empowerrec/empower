var mongoose = require('mongoose');

var PackageFeatureSchema = mongoose.Schema({

    Points: {
        type: Number
    },
    Feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature'
    },
    Package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
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

var PackageFeature = mongoose.model('PackageFeature', PackageFeatureSchema);


function createDefaultPackageFeatures() {
    PackageFeature.find({}).exec(function (err1, col) {
        if (col.length === 0) {

        }
    });


};

exports.createDefaultPackageFeatures = createDefaultPackageFeatures;
