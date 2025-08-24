 import Product from "../models/product.js ";
 import { isAdmin } from "./userController.js";


 export function saveProduct(req ,res){
    if(!isAdmin(req)){
        res.status(403).json({
            message:"You are not authorized to add a product"
            
    })
         return;
    }

    const product = new Product(
        req.body
    );

    product.save().then(() => {
        res.json({
            message: 'Product added successfully'
        });
    }).catch((error) => {
        res.status(500).json({
            message: 'Error adding product'
        });
    });
 }

