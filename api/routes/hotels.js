import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotels, updateHotel } from '../controllers/hotel.js';
import { createError } from '../utils/error.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();



//create
// "url/:id?limit=5"
router.post("/", verifyAdmin,createHotel)

//update
router.put("/:id",verifyAdmin, updateHotel)

//delete
router.delete("/:id", verifyAdmin, deleteHotel)

//get
router.get("/:id", getHotel)


//get all
router.get("/", getHotels
    // next()  // -> means go to the next middleware

    //customized error function
    //you can check condition and return the custom error function
    // const failed = true;
    // if(failed) return next(createError(401,"you are Authenticate"));
)

router.get("/find/countByCity", countByCity)
router.get("/find/countByType", countByType)





export default router