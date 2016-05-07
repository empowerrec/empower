var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    FirstName: {
        type: String
    },
    LastName: {
        type: String
    },
    UserName: {
        type: String,
        required: '{PATH} is required',
        unique: true
    }, //This Is Email
    Salt: {
        type: String,
        required: '{PATH} is required'
    },
    HashedPassword: {
        type: String,
        required: '{PATH} is required'
    }, 
    ResetPasswordToken: String,
    ResetPasswordExpires: Date,
    UserType: [String],
    AuthenticationStrategyName: String,
    AuthenticationStrategyId: String,
    AuthenticationStrategyToken: String,
    Gender: { type: String },
    BirthDate: { type: Date },
    AddressLine1: { type: String },
    AddressLine2: { type: String },
    AddressLine3: { type: String },
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


userSchema.methods = {
    authenticate: function (passwordToMatch) {
        return encryption.hashPassword(this.Salt, passwordToMatch) === this.HashedPassword;
    },
    hasRole: function (role) {
        return this.UserType.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function (err, col) {
        if (col.length === 0) {
            var salt, hash;
            
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'gamal');
            User.create({
                FirstName: 'Mohamed',
                LastName: 'Gamal',
                UserName: 'gamal@yahoo.com',
                Salt: salt,
                HashedPassword: hash,
                UserType: ['A'],
                AuthenticationStrategyName: 'local'
            });
            
            salt = encryption.createSalt();
            hash = encryption.hashPassword(salt, 'ali');
            User.create({
                FirstName: 'Ali',
                LastName: 'Mohamed',
                UserName: 'ali@yahoo.com',
                Salt: salt,
                HashedPassword: hash,
                AuthenticationStrategyName: 'local'
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
