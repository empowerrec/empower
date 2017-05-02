var mongoose = require('mongoose');

var UserPackageSchema = mongoose.Schema({
    NoOfMonths: {
        type: Number
    },
    Discount: {
        type: Number
    },
    TotalAmount: {
        type: Number
    },
    PackageAmount: {
        type: Number
    },
    StartDate: { type: Date },
    ExpiryDate: { type: Date },
    Package: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package'
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

var UserPackage = mongoose.model('UserPackage', UserPackageSchema);


function createDefaultUserPackages() {
    UserPackage.find({}).exec(function (err1, col) {
        if (col.length === 0) {

        }
    });


};

exports.createDefaultUserPackages = createDefaultUserPackages;
