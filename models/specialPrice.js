const mongoose = require('mongoose')



const specialprice = new mongoose.Schema({
      idBrand: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      },
      discount: {
        type: Number,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      updatedAt: {
        type: Date,
        default: Date.now
      },
      idClient: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
      }
});

module.exports = mongoose.model('specialprice',specialprice);
