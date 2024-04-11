const {Schema,model} = require('mongoose')



const brandSchema = new Schema({
    name: {
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

module.exports =model('Brand',brandSchema);
