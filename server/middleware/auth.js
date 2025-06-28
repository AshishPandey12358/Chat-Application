import User from "../models/User.js";
import jwt from "jsonwebtoken";

//Middleware to protect routes
export const protectRoute = async(req, res, next)=>{ // next executes controller function
    try{
        const token = req.headers.token; // we will send token from frontend in header for every api request
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await User.findById(decoded.userId).select("-password"); // password is removed from user data

        if(!user) return res.json({success: false, message: "User Not Found"}); // if user is not available

        req.user =user; // if user is available the this will add the user data in user req and controller function can access user data
        next(); //controller function
    }
    catch(error){
        console.log(error.message)
        res.json({success: false, message: error.message}); 
    }
}