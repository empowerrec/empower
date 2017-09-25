var mongoose = require('mongoose');

var ContactViaSchema = mongoose.Schema({

    Name:
    [{
        Lang: String,
        Text: String
    }]
    ,
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

var ContactVia = mongoose.model('ContactVia', ContactViaSchema);

function createDefaultContactVias() {
    ContactVia.find({}).exec(function (err, col) {
        if (col.length === 0) {

            ContactVia.create({
                Deleted: false,
                Name: [{
                    "Text": "Email", "Lang": "en" }, { "Text": "ايميل", "Lang": "ar" }]
            });

            ContactVia.create({
                Deleted: false,
                Name: [{
                    "Text": "Mobile Phone", "Lang": "en" }, { "Text": "المحمول", "Lang": "ar" }]
            });

            ContactVia.create({
                Deleted: false,
                Name: [{
                    "Text": "Telephone", "Lang": "en" }, { "Text": "التليفون", "Lang": "ar" }]
            });

        }
    });
}

exports.createDefaultContactVias = createDefaultContactVias;
