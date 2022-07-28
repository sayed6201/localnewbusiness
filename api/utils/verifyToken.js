import jwt from "jsonwebtoken"
import { createError } from "./error.js"


//this is a middleware to verify token before request being processed
export const verifyToken = (req,res,next) => {
    // const token = req.cookies.access_token

    // console.log(`verifyToken middleware sent req structure> ${JSON.stringify(req)}`)
    
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    console.log("token-header")
    console.log(token)

    if(!token){
        return next(createError(401,"You are not authneticated"))
    }

    jwt.verify(token, process.env.JWT, (err, user)=>{
        if(err) return next(createError(403, "Token is not valid"))
        req.user = user
        //going to next oprtation...
        next()
    })
}

//middle ware to verify id the user is admin or himself before deleting or updating an account
export const verifyUser = (req,res,next) =>{

    //calling a middle ware from another one and waiting for it's result
    verifyToken(req,res, ()=>{ // next has been removed from the param, otherwise it will go to user route
        if(req.user.id == req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized"))
        }
    })
}

//middle ware to verify id the user is admin or himself before deleting or updating an account
export const verifyAdmin = (req,res,next) =>{

    //calling a middle ware from another one and waiting for it;s result
    verifyToken(req,res, ()=>{ // next has been removed from the param, otherwise it will go to user route
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not an admin"))
        }
    })
}

