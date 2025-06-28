import cloudinary from "../lib/cloudinary.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

//user SignUP function
export const signup = async (req, res) => {
    const { fullName, email, password, bio } = req.body;

    try {
        if (!fullName || !email || !password || !bio) {
            return res.json({ success: false, message: "Missing Details" })
        }
        //If user already exists
        const user = await User.findOne({ email });

        if (user) {
            return res.json({ success: false, message: "Account Already Exists" })
        }
        //for no user meaning current user is new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            fullName, email, password: hashedPassword, bio
        });

        //Creating token to authenticate user

        const token = generateToken(newUser._id);

        res.json({ success: true, userData: newUser, token, message: "Account Created Successfully" })

    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false,  message: error.message })

    }
}


//controller function to login a user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email })

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if (!isPasswordCorrect) {
            return res.json({ success: false, message: "Invalid Credentials" });
        }

        const token = generateToken(userData._id)
        res.json({success: true, userData, token, message: "Login Successful"})
    }
    catch(error) {
        console.log(error.message);
        res.json({ success: false, message: error.message })
    }
}

//Controller fuction to check if user is authenticated or not using middleware. middleware is function that is executed before executing the controller function it ensures that routes are protected i.e if user is autheticted then only it can access the  API end points

export const checkAuth = (req, res) => {
    res.json({success:true, user: req.user}); // it returns user data when user is authenticated
}

//controller function to allow user to update their profile including images. cloudanary storage to store the image
export const updateProfile = async(req, res) =>{
    try{
        const {profilePic, bio, fullName} = req.body;
        const userID = req.user._id;

        let updatedUser;

        if(!profilePic){
           updatedUser =  await User.findByIdAndUpdate(userID, {bio, fullName},{new: true});
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updatedUser = await User.findByIdAndUpdate(userID, {profilePic: upload.secure_url, bio, fullName}, {new: true});    
        }
        res.json({success: true, user: updatedUser});
    }
    catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

