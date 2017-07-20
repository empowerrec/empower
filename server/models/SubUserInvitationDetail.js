var mongoose = require('mongoose');

var subUserInvitationDetailSchema = mongoose.Schema({

   Points: {
        type: Number
    },
  
  

    SubUserInvitation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubUserInvitation'
    },

    Feature: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Feature'
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

var SubUserInvitationDetail = mongoose.model('SubUserInvitationDetail', subUserInvitationDetailSchema);

function createDefaultSubUserInvitationDetail() {
    SubUserInvitationDetail.find({}).exec(function (err, col) {
        if (col.length === 0) {

            SubUserInvitationDetail.create({

                Deleted: false,
                Feature: null,
                SubUserInvitation: null,
                //Status: [{ "Text": "Accepted" , "Lang": "en" }, { "Text": "„Ê«›ﬁ" , "Lang": "ar" }]
            });

            SubUserInvitationDetail.create({
                Deleted: false,
                Feature: null,
                SubUserInvitation: null,
                //Status: [{ "Text": "OnProgress" , "Lang": "en" }, { "Text": "›Ì «·√‰ Ÿ«—" , "Lang": "ar" }]

            });

        }
    });
}

exports.createDefaultSubUserInvitationDetail = createDefaultSubUserInvitationDetail;