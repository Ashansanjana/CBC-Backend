 import Product from "../models/product.js ";
 import { isAdmin } from "./userController.js";


export async function getProducts(req, res) {
    try {
        if(isAdmin(req)){
            const products = await Product.find();
            res.json(products);
        }else{
            const products = await Product.find({ isAvailable: true });
            res.json(products);
        }
    }catch (error) {
        res.status(500).json({
             message: 'Error fetching products',
             error: error.message});
    }
}

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

export async function deleteProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message:"You are not authorized to delete a product"      
    })
         return;
    }
    try {
        await Product.deleteOne({ productID: req.params.productID });
        res.json({ message: 'Product deleted successfully' });

    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting product', 
            error: error.message });
    }
}

export async function updateProduct(req, res) {
    if(!isAdmin(req)){
        res.status(403).json({
            message:"You are not authorized to update a product"      
    })
         return;
    }

    const productID = req.params.productID;
    const updatedData = req.body;

    try {
        await Product.updateOne(
            { productID: productID},
              updatedData
           
        );
        res.json({ message: 'Product updated successfully' });

    } catch (err) {
        res.status(500).json({ 
            message: 'Error updating product', 
            error: err });
    }
}

export async function getProductByid(req, res) {
    const productID = req.params.productID;
    try {
        const product = await Product.findOne(
            {productID: productID }
        )

    if(product==null){
        res.status(404).json({message:"Product not found"});
    }

    if(product.isAvailable){
        res.json(product);

    }}catch (err) {
        res.status(500).json({ 
            message: 'Error fetching product', 
            error: err});
    }
}
