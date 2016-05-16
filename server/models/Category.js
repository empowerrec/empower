var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
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
    }, Deleted : Boolean  ,   
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
{
    timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
});

var Category = mongoose.model('Category', categorySchema);

function createDefaultCategories() {
    Category.find({}).exec(function (err, col) {
        if (col.length === 0) {
            Category.create({
                Description: 'First Category'
            });
        }
    });
}

exports.createDefaultCategories = createDefaultCategories;