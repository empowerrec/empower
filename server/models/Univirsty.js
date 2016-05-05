var mongoose = require('mongoose');

var UnivirstySchema = mongoose.Schema({
    
    Name: [{
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
                Name: [{ "Text": "Cairo Univirsty" , "Lang": "en" }, { "Text": "����� �������" , "Lang": "ar" }]
                        
                    });
                    
                    Univirsty.create({
                Name: [{ "Text": "Ain Shams Univirsty" , "Lang": "en" }, { "Text": "����� ��� ���" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultUnivirsties = createDefaultUnivirsties;