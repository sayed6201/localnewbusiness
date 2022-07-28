import User from '../models/User.js';
import bcrypt from 'bcryptjs'

// export const createUser = async (req, res, next) =>{
//     const newHotel = await User(req.body)
//     try{
//         const savedUser = await newUser.save()
//         res.status(200).json(savedUser)
//     }catch(err){
//         next(err)
//     }
// }


export const updateUser = async (req, res, next) =>{
    try{

        var salt = bcrypt.genSaltSync(10)
        var hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            ...req.body,
            password: hash,
        })

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: newUser},
            {new:true} // updated version of the document will be returned
            )

        const {password, isAdmin, ...otherInfo} = updateUser
        res.status(200).json({
            userInfo: otherInfo
        });
    }catch(err){
        next(err)
    }
}


export const getUser = async (req, res, next) =>{
    try{
        const UserData = await User.findById(req.params.id)
         res.status(200).json(UserData);
     }catch(err){
        next(err)
     }
}

export const deleteUser = async (req, res, next) =>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json(savedUser)
    }catch(err){
        next(err)
    }
}

export const getUsers = async (req, res, next) =>{
    // next()  // -> means go to the next middleware

    //customized error function
    //you can check condition and return the custom error function
    // const failed = true;
    // if(failed) return next(createError(401,"you are Authenticated"));

    try{
        const UserData = await User.find()
        res.status(200).json(UserData)
     }catch(err){
         // res.status(500).json(err)
          next(err)
     }
}