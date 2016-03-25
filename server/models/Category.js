var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
    CategoryName: {type: String, required: '{PATH} is required', unique: true}
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