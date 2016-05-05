var mongoose = require('mongoose');

var SpecializationSchema = mongoose.Schema({
    
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

var Specialization = mongoose.model('Specialization', SpecializationSchema);


function createDefaultSpecializations() {
            Specialization.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    Specialization.create({
                Name: [{ "Text": "IT" , "Lang": "en" }, { "Text": "��������� ���������" , "Lang": "ar" }]
                        
                    });
                    
                    Specialization.create({
                Name: [{ "Text": "CS" , "Lang": "en" }, { "Text": "���� ����" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultSpecializations = createDefaultSpecializations;