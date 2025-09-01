import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({ 
    userEmail: {
        type: String,
        required: true
},
    userName: {
        type: String,
        required: true
    },
    productID: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true},
    Comment: {
        type: String,
        required: true}});

const Review = mongoose.model('Review', reviewSchema);

export default Review;