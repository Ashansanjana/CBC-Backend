import mongoose from "mongoose";    

const orderSchema = new mongoose.Schema({
    orderID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone : {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    labelledtotal: {
        type: Number,
        required: true
    },

    total: {
        type: Number,
        required: true
    },
    product:[
        {
            productInfo:{
                productID: {type: String, required: true},
                name: {type: String, required: true},
                altNames: [{type: String}],
                description: {type: String, required: true},
                images : [{type: String}],
                labelledPrice: {type: Number, required: true},
                price: {type: Number, required: true},

            },
            quantity: {
                type: Number, 
                required: true
            }}],
        
    date: {
        type: Date,
        default: Date.now
        }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;