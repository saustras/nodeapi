const mongoose = require('mongoose')


const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      lastname: {
        type: String,
        required: true
      },
      country: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('Client',clientSchema);



