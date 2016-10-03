var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
        Title: {type: String, required: '{PATH} is required', unique: true},
TrainingCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrainingCenter'
    },
    JobSeeker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker'
    },
    Specialization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization'
    },
    Grade: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Grade'
    },
    CourseYear: Number,
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
        timestamps: {createdAt: 'CreatedAt', updatedAt: "UpdatedAt"}
    });

var Course = mongoose.model('Course', courseSchema);

function createDefaultCourses() {
    Course.find({}).exec(function (err, col) {
        if (col.length === 0) {
            Course.create({
                Deleted : false, 
                Title: 'C# for Sociopaths',
                Featured: true,
                Published: new Date('10/5/2013'),
                Tags: ['C#']
            });
            Course.create({
                Deleted : false, 
                Title: 'C# for Non-Sociopaths',
                Featured: true,
                Published: new Date('10/12/2013'),
                Tags: ['C#']
            });
            Course.create({
                Deleted : false, 
                Title: 'Super Duper Expert C#',
                Featured: false,
                Published: new Date('10/1/2013'),
                Tags: ['C#']
            });
            Course.create({
                Deleted : false, 
                Title: 'Visual Basic for Visual Basic Developers',
                featured: false,
                Published: new Date('7/12/2013'),
                Tags: ['VB']
            });
            Course.create({
                Deleted : false, Title: 'Pedantic C++', Featured: true, published: new Date('1/1/2013'), tags: ['C++']});
            Course.create({
                Deleted : false, 
                Title: 'JavaScript for People over 20',
                Featured: true,
                Published: new Date('10/13/2013'),
                Tags: ['JS']
            });
            Course.create({
                Deleted : false, 
                Title: 'Maintainable Code for Cowards',
                Featured: true,
                Published: new Date('3/1/2013'),
                Tags: ['Coding']
            });
            Course.create({
                Deleted : false, 
                Title: 'A Survival Guide to Code Reviews',
                featured: true,
                Published: new Date('2/1/2013'),
                Tags: ['Coding']
            });
            Course.create({
                Deleted : false, 
                Title: 'How to Job Hunt Without Alerting your Boss',
                Featured: true,
                Published: new Date('10/7/2013'),
                Tags: ['Misc']
            });
            Course.create({
                Deleted : false, 
                Title: 'How to Keep your Soul and go into Management',
                Featured: false,
                Published: new Date('8/1/2013'),
                Tags: ['Management']
            });
            Course.create({
                Deleted : false, 
                Title: 'Telling Recruiters to Leave You Alone',
                Featured: false,
                Published: new Date('11/1/2013'),
                Tags: ['Misc']
            });
            Course.create({
                Deleted : false, 
                Title: 'Writing Code that Does not Suck',
                Featured: true,
                Published: new Date('10/13/2013'),
                Tags: ['Coding']
            });
            Course.create({
                Deleted : false, 
                Title: 'Code Reviews for Jerks',
                Featured: false,
                Published: new Date('10/1/2013'),
                Tags: ['Coding']
            });
            Course.create({
                Deleted : false, 
                Title: 'How to Deal with Narcissistic Coworkers',
                Featured: true,
                Published: new Date('2/15/2013'),
                Tags: ['Misc']
            });
            Course.create({
                Deleted : false, 
                Title: 'Death March Coding for Fun and Profit',
                Featured: true,
                Published: new Date('7/1/2013'),
                Tags: ['Coding', 'Misc']
            });
        }
    });
}

exports.createDefaultCourses = createDefaultCourses;