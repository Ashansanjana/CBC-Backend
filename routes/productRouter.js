import express from 'express';
import {saveProduct,getProducts,deleteProduct} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/', saveProduct);
productRouter.get('/', getProducts);
productRouter.delete('/:productID', deleteProduct); // : indicates a route parameter

export default productRouter;