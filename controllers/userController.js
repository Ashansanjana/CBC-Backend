import User from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


export function createUser(req, res) {
    if(req.body.role="admin" ){
        if(req.user!=null){
            if(req.user.role!="admin"){
                return res.status(403).json({
                    message:"You are not authorized to create an admin user"
                })
                return;
            }

        }else{
            res.status(403).json({
                message:"You are not authorized to create an admin user"
            })
            return;
        }
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
        role: req.body.role,
        isBlocked: req.body.isBlocked
       
    });

    user.save().then(() => {
        res.json({
            message: 'User created successfully'
        });
    }).catch((error) => {
        res.status(500).json({
            message: 'Error creating user'
        });
    });
}

export function loginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then((user) => {
        if (user==null) {
            return res.status(404).json({ message: 'email is invalid' });
        }else{
                const isPasswordValid = bcrypt.compareSync(password, user.password);
                if (isPasswordValid) {
                  //create a token  
                    const token = jwt.sign(
                        {   email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            role: user.role,
                            img : user.img   
                        } ,
                        process.env.JWT_KEY
                    )

                    res.json({
                        message : 'Login successful',
                        token: token
                    })}else {
                    res.status(401).json({
                        message: 'Password is invalid'
                    });
        }}})

}

export function isAdmin(req){
        if(req.user==null){
            return false ;
        }
        if(req.user.role!="admin"){
            return false ;
        }
        return true ;
}