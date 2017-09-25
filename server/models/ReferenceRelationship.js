var mongoose = require('mongoose');

var ReferenceRelationshipSchema = mongoose.Schema({
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
}, Deleted : Boolean  ,   
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: { createdAt: 'CreatedAt' , updatedAt:"UpdatedAt" }
    });


var ReferenceRelationship = mongoose.model('ReferenceRelationship', ReferenceRelationshipSchema);

function createDefaultReferenceRelationships() {
    ReferenceRelationship.find({}).exec(function(err, col) {
        if (col.length === 0) {

            ReferenceRelationship.create({
                Deleted : false, 
                Name: [{ "Text": "Supervisor/Manager", "Lang": "en" }, { "Text":"Supervisor/Manager" , "Lang":"ar"}]

          });


            ReferenceRelationship.create({
                Deleted : false, 
                Name: [{ "Text": "Colleague", "Lang": "en" }, { "Text":"Colleague" , "Lang":"ar"}]

            });

            ReferenceRelationship.create({
                Deleted: false,
                Name: [{ "Text": "Client / Business Partner", "Lang": "en" }, { "Text": "Client / Business Partner", "Lang": "ar" }]

            });


            ReferenceRelationship.create({
                Deleted: false,
                Name: [{ "Text": "Tutor/Professor", "Lang": "en" }, { "Text": "Tutor/Professor", "Lang": "ar" }]

            });

            ReferenceRelationship.create({
                Deleted: false,
                Name: [{ "Text": "Friend/Family", "Lang": "en" }, { "Text": "Friend/Family", "Lang": "ar" }]

            });
    }
  });
}

exports.createDefaultReferenceRelationships = createDefaultReferenceRelationships;
