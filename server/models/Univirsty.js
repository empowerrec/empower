var mongoose = require('mongoose');

var UnivirstySchema = mongoose.Schema({
    
    Name: [{
            Lang: String,
            Text: String
        }], Confirmed : Boolean  ,
    
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

var Univirsty = mongoose.model('Univirsty', UnivirstySchema);


function createDefaultUnivirsties() {
            Univirsty.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    Univirsty.create({
                Deleted : false,
                Name: [{ "Text": "Cairo Univirsty" , "Lang": "en" }, { "Text": "Ã«„⁄… «·ﬁ«Â—…" , "Lang": "ar" }]
                        
                    });
                    
                    Univirsty.create({
                Deleted : false,
                Name: [{ "Text": "Ain Shams Univirsty" , "Lang": "en" }, { "Text": "Ã«„⁄… ⁄Ì‰ ‘„”" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultUnivirsties = createDefaultUnivirsties;
