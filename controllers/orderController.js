import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {

    if(req.user==null){
        res.status(403).json({
            message:"Please login and try again"   //if user is not logged in
        })
        return;
    }
    const orderInfo = req.body;

    if(orderInfo.name==null){
        orderInfo.name=req.user.firstName+" "+req.user.lastName;   //if name is not provided, use the name from the token   
    }

    //order ID generation 
    //CBC00001
    let orderID = "CBC00001" ;

    const lastOrder = await Order.findOne().sort({ date: -1 }); //find the last order

    if(lastOrder){

        const lastOrderID = lastOrder.orderID;    //get the last order ID
        const lastOrderNumberString = lastOrderID.replace("CBC", ""); //remove the "CBC" part
        const lastOrderNumber = parseInt(lastOrderNumberString); //convert to integer
        const newOrderNumber = lastOrderNumber + 1; //increment by 1
        const newOrderNumberString = String(newOrderNumber).padStart(5, '0'); //pad with leading zeros
        orderID = "CBC" + newOrderNumberString; //add the "CBC" part
    }
      
        try {  

            let total = 0;
            let labelledtotal = 0;

            const products =[];

            for(let i=0; i< orderInfo.product.length; i++){
                const item = await Product.findOne({productID: orderInfo.product[i].productID});

                 if(item==null){
                    res.status(404).json({
                        message: `Product with ID ${orderInfo.product[i].productID} not found`
                    });
                    return;
                 }

                 if(item.isAvailable==false){
                    res.status(400).json({
                        message: `Product with ID ${orderInfo.product[i].productID} is not available`
                    });
                    return;
                 }

                 products[i]={
                    productInfo: {
                        productID: item.productID,
                        name: item.productName,
                        altNames: item.altNames,
                        description: item.description,
                        images: item.images,
                        labelledPrice: item.labelledPrice,
                        price: item.price,
                    },
                    quantity: orderInfo.product[i].quantity
                 };

                 total += item.price * orderInfo.product[i].quantity;
                 labelledtotal += item.labelledPrice * orderInfo.product[i].quantity;


            }


        const order = new Order({
            orderID: orderID,
            email: req.user.email,
            name: orderInfo.name,
            address: orderInfo.address,
            phone: orderInfo.phone,
            total: total,
            labelledtotal: labelledtotal,
            product : products
           });
            

           const createOrder = await order.save();
            res.json({
                message: 'Order created successfully',
                order : createOrder
            });
        }catch (err) {
            res.status(500).json({
                message: 'Error creating order',
                error: err
            });
        }

}