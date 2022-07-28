import express from 'express'
import { login, register } from '../controllers/auth.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

router.post("/register",register)
router.post("/login",login)

router.post("/isadmin", verifyAdmin, (req, res, next)=>{

    try{
        //this will stop middle ware from executing
        res.status(200).json({
            "isAdmin" : true,
            "Message" : "It is Admin"
        })
    }catch(err){
        next(err)
    }
})


export default router