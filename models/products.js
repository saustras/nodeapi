const mongoose = require('mongoose')



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      stock: {
        type: Number,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      brand: {
        type: mongoose.Schema.Types.ObjectId,
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



module.exports = mongoose.model('products',productSchema);




