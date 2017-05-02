var mongoose = require('mongoose');

var PackageCostSchema = mongoose.Schema({
    PeriodFromByMonth: {
        type: Number
    },
    PeriodToByMonth: {
        type: Number
    },
    CostPerMonth: {
        type: Number
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

var PackageCost = mongoose.model('PackageCost', PackageCostSchema);


function createDefaultPackageCosts() {
    PackageCost.find({}).exec(function (err1, col) {
        if (col.length === 0) {

        }
    });


};

exports.createDefaultPackageCosts = createDefaultPackageCosts;
