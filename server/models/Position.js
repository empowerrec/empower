var mongoose = require('mongoose');

var PositionSchema = mongoose.Schema({
    
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

var Position = mongoose.model('Position', PositionSchema);


function createDefaultPositions() {
            Position.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    Position.create({
                Deleted : false,
                Name: [{ "Text": "Senior Developer" , "Lang": "en" }, { "Text": "„»—„Ã √Ê·" , "Lang": "ar" }]
                        
                    });
                    
                    Position.create({
                Deleted : false,
                Name: [{ "Text": "Team Leader" , "Lang": "en" }, { "Text": "„œÌ— ›—Ìﬁ" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultPositions = createDefaultPositions;
