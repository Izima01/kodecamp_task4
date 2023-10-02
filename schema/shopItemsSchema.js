const { Schema, model } = require('mongoose');

const shopItemsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isInStock: {
        type: Boolean,
        required: true,
    },
}, { timestamps: true });

const shopItemsCollection = model('shopItems', shopItemsSchema);

module.exports = shopItemsCollection;