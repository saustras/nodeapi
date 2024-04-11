const Product = require('../models/products');
const Client = require('../models/client');
const mongose= require('mongoose');


const productExists = async(product='')=>{
    const productExits = await Product.findOne({name: product});
    if(!productExits){
        throw new Error(`the product ${product} does not exist in the database`)
    }
}

const clientExistsForId = async (id) => {
    if (!mongose.Types.ObjectId.isValid(id)) {
        throw new Error(`Invalid client ID: ${id}`);
    }
    const client = await Client.findById(id);
    if (!client) {
        throw new Error(`Client with ID ${id} does not exist`);
    }
};


module.exports ={
    productExists,
    clientExistsForId
}