import express from 'express';
import {saveProduct,getProducts,deleteProduct, updateProduct, getProductByid} from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.post('/', saveProduct);
productRouter.get('/', getProducts);
productRouter.delete('/:productID', deleteProduct); // : indicates a route parameter
productRouter.put('/:productID', updateProduct);
productRouter.get('/:productID', getProductByid);

export default productRouter;