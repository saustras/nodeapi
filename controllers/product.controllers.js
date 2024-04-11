const {response, request, query} = require ('express');
const Product = require('../models/products');
const SpecialPrice = require('../models/specialPrice');
const Brand = require('../models/brand');
const mongoose = require('mongoose')



const productGet = async(req= request, res= response) => {
    try {
        const { limit = 10, page = 1, filtro = null } = req.query;

        const parsedPage = parseInt(page);
        const parsedLimit = parseInt(limit);
        if (isNaN(parsedPage) || isNaN(parsedLimit) || parsedPage <= 0 || parsedLimit <= 0) {
            return res.status(400).send({ message: 'Invalid page or limit values' });
        }

        let query;
        if (filtro == null || filtro === 'null') {
            query = { stock: { $gt: 0 } };
        } else {
            query = { name: new RegExp(filtro, 'i'), stock: { $gt: 0 } };
        }

        const [total, product] = await Promise.all([
            Product.countDocuments(query),
            Product.find(query)
                .skip((parsedPage - 1) * parsedLimit) 
                .limit(parsedLimit)
        ]);

        if (total === 0) {
            return res.status(404).send({ message: 'Products not found', data:undefined});
        }

        return res.status(200).send({ message: 'Products found', data: product, count: total, page: parsedPage });
    } catch (error) {
        return res.status(500).send({ message: 'Error', error: error.message });
    }
}

const productGetSpecialPrice = async (req, res) => {
    try {
        const { id, product } = req.params;
        const productData = await Product.findOne({ name: product });
        if (productData.stock == 0) {
            return res.status(404).send({
                message: "This product is out of stock",
                data: undefined ,
            });
        }

        const { brand, price } = productData;
        const brandData = await Brand.findById(brand);
        const brandName = brandData.name;

        const idClient = mongoose.Types.ObjectId(id);
        const specialPrice = await SpecialPrice.findOne({
            idBrand: brand,
            idClient: idClient,
        });

        if (specialPrice && specialPrice.discount) {
            const newPrice = price * specialPrice.discount;
            return res.status(200).send({
                message: "Product found with special price",
                data: { price: newPrice, brand: brandName },
            });
        }

        return res.status(200).send({
            message: "Product found",
            data: { price: price, brand: brandName },
        });
    } catch (error) {
        return res.status(500).send({ message: "Error", error: error.message });
    }
};

module.exports = {
    productGet,
    productGetSpecialPrice
}

