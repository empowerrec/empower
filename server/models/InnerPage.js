var mongoose = require('mongoose');

var innerPageSchema = mongoose.Schema({
       
        PageTitle: [{
            Lang: String,
            Text: String
        }]
        ,
        PageBody: [{
            Lang: String,
            Text: String

        }],
       
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
        timestamps: {createdAt: 'CreatedAt', updatedAt: "UpdatedAt"}
    });

var InnerPage = mongoose.model('InnerPage', innerPageSchema);

function createDefaultInnerPages() {
    InnerPage.find({}).exec(function (err, col) {
        if (col.length === 0) {

            InnerPage.create({
                Deleted : false,
                PageTitle: [{"Lang":"en" , "Text":"About US Page Title"}, { "Lang": "ar" , "Text": "⁄‰ «·‘—ﬂ…" }],
                PageBody: [{ "Lang": "en" , "Text": "About US Page Body" }, { "Lang": "ar" , "Text": "⁄‰ «·‘—ﬂ…" }],
            });

            InnerPage.create({
                Deleted : false,
                PageTitle: [{ "Lang": "en" , "Text": "Contact US Page Title" }, { "Lang": "ar" , "Text": "« ’· »‰«" }],
                PageBody: [{ "Lang": "en" , "Text": "Contact US Page Body" }, { "Lang": "ar" , "Text": "« ’· »‰«" }],
            });
        }
    });
}

exports.createDefaultInnerPages = createDefaultInnerPages;
