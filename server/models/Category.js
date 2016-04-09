var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
        CategoryName: {type: String, required: '{PATH} is required', unique: true},
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
        timestamps: {createdAt: 'CreatedAt', updatedAt: "UpdatedAt"}
    });

var Category = mongoose.model('Category', categorySchema);

function createDefaultCategories() {
    Category.find({}).exec(function (err, col) {
        if (col.length === 0) {
            Category.create({
                CategoryName: 'First Category'
            });
        }
    });
}

exports.createDefaultCategories = createDefaultCategories;