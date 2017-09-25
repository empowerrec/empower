var mongoose = require('mongoose');

var HearAboutUsSchema = mongoose.Schema({

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

var HearAboutUs = mongoose.model('HearAboutUs', HearAboutUsSchema);

function createDefaultHearAboutUss() {
    HearAboutUs.find({}).exec(function (err, col) {
        if (col.length === 0) {

            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Google Search", "Lang": "en" }, { "Text": "بحث جوجل", "Lang": "ar" }]

            });


            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Other Website", "Lang": "en" }, { "Text": "موقع آخر", "Lang": "ar" }]

            });

            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Newspaper", "Lang": "en" }, { "Text": "جريدة", "Lang": "ar" }]

            });


            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Magazine", "Lang": "en" }, { "Text": "مجلة", "Lang": "ar" }]

            });

            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Radio", "Lang": "en" }, { "Text": "راديو", "Lang": "ar" }]

            });


            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Television", "Lang": "en" }, { "Text": "التليفزيون", "Lang": "ar" }]

            });

            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Email Message", "Lang": "en" }, { "Text": "رسالة الكترونية", "Lang": "ar" }]

            });


            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Events/Exhibtions", "Lang": "en" }, { "Text": "أحداث / معارض", "Lang": "ar" }]

            });

            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Frind/word of mouth", "Lang": "en" }, { "Text": "صديق / كلمة في الفم", "Lang": "ar" }]

            });


            HearAboutUs.create({
                Deleted: false,
                Name: [{ "Text": "Others", "Lang": "en" }, { "Text": "الآخرين", "Lang": "ar" }]

            });

        }
    });
}

exports.createDefaultHearAboutUss = createDefaultHearAboutUss;
