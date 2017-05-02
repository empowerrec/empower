var mongoose = require('mongoose');

var subUserInvitationSchema = mongoose.Schema({

    Status: {type:String}  
    ,
    Email: String,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    Employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
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
        timestamps: { createdAt: 'CreatedAt' , updatedAt:"UpdatedAt" }
    });

var SubUserInvitation = mongoose.model('SubUserInvitation', subUserInvitationSchema);

function createDefaultSubUserInvitation() {
    SubUserInvitation.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            SubUserInvitation.create({
                Deleted : false,
                Status: [{ "Text": "Accepted" , "Lang": "en" }, { "Text": "„Ê«›ﬁ" , "Lang": "ar" }]
            });
            
            SubUserInvitation.create({
                Deleted : false,
                Status: [{ "Text": "OnProgress" , "Lang": "en" }, { "Text": "›Ì «·√‰ Ÿ«—" , "Lang": "ar" }]

            });
          
        }
    });
}

exports.createDefaultSubUserInvitation = createDefaultSubUserInvitation;