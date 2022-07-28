import express from 'express'
import { verifyAdmin } from '../utils/verifyToken.js';
import {createRoom, updateRoom, deleteRoom, getRoom, getRooms} from '../controllers/room.js'


const router = express.Router();

//create
// "url/:id?limit=5"
router.post("/", verifyAdmin,createRoom)

//update
router.put("/:id",verifyAdmin, updateRoom)

//delete
router.delete("/:id", verifyAdmin, deleteRoom)

//get
router.get("/:id", getRoom)


//get all
router.get("/", getRooms
    // next()  // -> means go to the next middleware

    //customized error function
    //you can check condition and return the custom error function
    // const failed = true;
    // if(failed) return next(createError(401,"you are Authenticate"));
)

export default router