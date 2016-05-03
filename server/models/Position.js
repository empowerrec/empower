var mongoose = require('mongoose');

var PositionSchema = mongoose.Schema({
    
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

var Position = mongoose.model('Position', PositionSchema);


function createDefaultPositions() {
            Position.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    Position.create({
                Name: [{ "Text": "Senior Developer" , "Lang": "en" }, { "Text": "����� ���" , "Lang": "ar" }]
                        
                    });
                    
                    Position.create({
                Name: [{ "Text": "Team Leader" , "Lang": "en" }, { "Text": "���� ����" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultPositions = createDefaultPositions;
