var mongoose = require('mongoose');

var MilitaryStatusSchema = mongoose.Schema({
    
    Name: [{
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
    }, Deleted : Boolean  ,   
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
    timestamps: { createdAt: 'CreatedAt' , updatedAt: "UpdatedAt" }
});

var MilitaryStatus = mongoose.model('MilitaryStatus', MilitaryStatusSchema);

function createDefaultMilitaryStatuss() {
    MilitaryStatus.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            MilitaryStatus.create({
                Deleted : false,
                Name: [
                    { "Text": "Not Applicable" , "Lang": "en" }
                    , { "Text": "أدى الخدمة" , "Lang": "ar" }
                ]
            });
            
            MilitaryStatus.create({
                Deleted : false,
                Name: [
                    { "Text": "Exempted" , "Lang": "en" }
                    , { "Text": "تأجيل" , "Lang": "ar" }
                ]
            });
            
            MilitaryStatus.create({
                Name: [
                    { "Text": "Completed" , "Lang": "en" }
                    , { "Text": "اعفاء" , "Lang": "ar" }
                ]
            });
        }
    });
}

exports.createDefaultMilitaryStatuss = createDefaultMilitaryStatuss;
