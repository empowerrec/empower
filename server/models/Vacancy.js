var mongoose = require('mongoose');
var vacancyTypes = 'Full Time,Part Time,Temporary,Any'.split(',');
var vacancySchema = mongoose.Schema({
    Employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    Type: {type: String, enum: vacancyTypes},
    AvailableFrom:{type:Date},
    AvailableTo:{type:Date},
    WorkPlace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
    Salary: {type: Number},
    JobDescription: {type: String}
});

var Vacancy = mongoose.model('JobSeeker', vacancySchema);

function createDefaultVacancies() {
    Vacancy.find({}).exec(function(err, col) {
        if (col.length === 0) {
    /*
            Vacancy.create({
            EmployerName: 'Ibnsina-pharma',
            EmployerType: 'D',
            NumberOfEmployees: 5000,
            AverageNumberOfJobOpeningsPerMonth:50
            });

            Vacancy.create({
                EmployerName: 'Empower',
                EmployerType: 'S',
                NumberOfEmployees: 10,
                AverageNumberOfJobOpeningsPerMonth:1
          });
    */
    }
  });
}

exports.createDefaultVacancies = createDefaultVacancies;