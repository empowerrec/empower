var mongoose = require('mongoose');

var employerSchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry'
    },
  EmployerName:
      [{
          Lang: String,
          Text: String
      }]
  ,
    Address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address'
    },
  EmployerType: {
    type: String,
    required: '{PATH} is required'
  },
    NumberOfEmployees: {
        type: Number,
        required: '{PATH} is required'
    },
    AverageNumberOfJobOpeningsPerMonth: {
        type: Number,
        required: '{PATH} is required'
    },
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
        timestamps: { createdAt: 'CreatedAt' , updatedAt:"UpdatedAt" }
    });

/*
employerSchema.methods = {
  authenticate: function(passwordToMatch) {
    return encryption.hashPassword(this.Salt, passwordToMatch) === this.HashedPassword;
  },
  hasRole: function(role) {
      return this.UserType.indexOf(role) > -1;
  }
};
*/
var Employer = mongoose.model('Employer', employerSchema);

function createDefaultEmployers() {
    Employer.find({}).exec(function(err, col) {
        if (col.length === 0) {

            Employer.create({
            EmployerName: 'Ibnsina-pharma',
            EmployerType: 'D',
            NumberOfEmployees: 5000,
            AverageNumberOfJobOpeningsPerMonth:50
          });


            Employer.create({
                EmployerName: 'Empower',
                EmployerType: 'S',
                NumberOfEmployees: 10,
                AverageNumberOfJobOpeningsPerMonth:1
      });
    }
  });
}

exports.createDefaultEmployers = createDefaultEmployers;
