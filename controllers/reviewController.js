import Review from "../models/review.js";
import Order from "../models/order.js";
import Product from "../models/product.js";


export async function submitReview(req, res) {
    if(req.user==null){
        res.status(403).json({
            message:"Please login and try again"   //if user is not logged in
        })
        return;
    }
     
    const reviewInfo = req.body;

    if(reviewInfo.userName==null){
        reviewInfo.userName=req.user.firstName+" "+req.user.lastName;   //if name is not provided, use the name from the token
    }

    const productID =req.params.productID;
    const email = req.user.email;

    //check if the product exists
    try{
        const product = await Product.findOne({productID: productID});

        if(product==null){
            res.status(404).json({message:"Product not found"});
            return;
        }}catch(error){
            res.status(500).json({message:"Error checking product"});
            return;
        }

    try{
        const hasOrdered = await Order.findOne({email: email , "product.productInfo.productID": productID});

        if(hasOrdered==null){
            res.status(400).json({
                message:"You can only review products you have purchased"
            })
            return;
        }
    }catch(error){
        res.status(500).json({
            message:"Error checking order history"
        })
        return;
    }

    try {
        const review = new Review({
            productID: productID,
            userName: reviewInfo.userName,
            userEmail: email,
            rating: reviewInfo.rating,
            Comment: reviewInfo.Comment

        });

        const savedReview = await review.save();
        res.json({
            message: 'Review submitted successfully',
            review: savedReview
        });
    
    }catch (err) {
        res.status(500).json({
            message: 'Error submitting review',
            error: err
        });
    }

}