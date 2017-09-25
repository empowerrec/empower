var mongoose = require('mongoose');

var VisaStatusSchema = mongoose.Schema({

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

var VisaStatus = mongoose.model('VisaStatus', VisaStatusSchema);

function createDefaultVisaStatuss() {
    VisaStatus.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            VisaStatus.create({
                Deleted: false,
                Name: [{ "Text": "Citizen", "Lang": "en" }, { "Text": "مواطن", "Lang": "ar" }]

            });


            VisaStatus.create({
                Deleted: false,
                Name: [{ "Text": "No Visa", "Lang": "en" }, { "Text": "لا تأشيرة", "Lang": "ar" }]

            });

            VisaStatus.create({
                Deleted: false,
                Name: [{ "Text": "Residency Visa (Non-Transformable)", "Lang": "en" }, { "Text": "تأشيرة الإقامة (غير قابلة للتحويل)", "Lang": "ar" }]

            });


            VisaStatus.create({
                Deleted: false,
                Name: [{ "Text": "Residency Visa (Transformable)", "Lang": "en" }, { "Text": "تأشيرة الإقامة (قابلة للتحويل)", "Lang": "ar" }]

            });

            VisaStatus.create({
                Deleted: false,
                Name: [{ "Text": "Student Visa", "Lang": "en" }, { "Text": "تأشيرة طالب", "Lang": "ar" }]

            });


            VisaStatus.create({
                Deleted: false,
                Name: [{ "Text": "Visit Visa", "Lang": "en" }, {"Text": "تأشيرة زيارة", "Lang": "ar" }]

            });
        }
    });
}

exports.createDefaultVisaStatuss = createDefaultVisaStatuss;
