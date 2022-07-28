import express from 'express'
import { updateUser, getUser, deleteUser, getUsers } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';


const router = express.Router();

router.get("/checkauthentication", verifyToken,(req, res, next) =>{
    // when next is called in the verifyToken function it will come here...
    res.send("hello user, you are authenticated")
    // res.json({JSON.stringify(req)})
})

router.get("/checkuser/:id", verifyUser,(req, res, next) =>{
    // when next is called in the verifyToken function it will come here...
    res.send("hello user, you are authenticated")
})

router.get("/checkadmin", verifyAdmin,(req, res, next) =>{
    // when next is called in the verifyToken function it will come here...
    res.send("hello admin, you are authenticated")
})


//create
// "url/:id?limit=5"
// router.post("/",createUser)

//update
router.put("/:id", verifyUser, updateUser)

//delete
router.delete("/:id", verifyUser, deleteUser)

//get
router.get("/:id", verifyAdmin, getUser)


//get all
router.get("/", verifyAdmin, getUsers
    // next()  // -> means go to the next middleware / or next process

    //===============================
    //customized error function
    //you can check condition and return the custom error function
    //===============================
    // const failed = true;
    // if(failed) return next(createError(401,"you are Authenticated"));
)


export default router