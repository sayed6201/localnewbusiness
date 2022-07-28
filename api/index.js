import  express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import companyHouseRoute from './routes/companyHouse.js'


const app = express()
dotenv.config()
const port = 3000

const connect = async ()=> {
    try {
        await mongoose.connect(process.env.MONGO_DB);
        console.log("connected to mongoDB");
    } catch (error) {
        throw error;
    }
}

mongoose.connection.on("disconnected",() => {
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected",() => {
    console.log("mongoDB connected")
})

//you hace to tell node to use cookie parser
app.use(cookieParser())

//middleware can access req and res before sending it to controller or router
app.use(express.json())

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/getnewdata", companyHouseRoute);


//==================================
// middlewares
//using middle ware to handle error
//middleware are visited sequentially.
//==================================
// if you use 'next()' inside route then it will come to this middleware or next feasible middleware
/*
    1) The next() function is not part of Node js core but is used widely in Express js as middleware functions.
    2) Use the next() Function to Write Custom Middleware Functions in ExpressJS.
    3) Use the next() Function to Pass Control to the Next Middleware Function in ExpressJS.
*/
app.use((err, req, res, next)=>{
    // if(!isError){
    //     return next()
    // }

    console.log("hi im in error handling middlewARE")
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
      })
    })

    // app.use((isError, req, res, next)=>{
        
    //     console.log("hi im in success msg handler middleware")
    //     const successStatus = msg.status 
    //     const successMessage = msg.message 
    //     return res.status(errorStatus).json({
    //         success: true,
    //         status: successStatus,
    //         message: successMessage,
    //       })
    //     })
// if you use 'next()' inside route then it will come to this middleware or next feasible middleware
// app.use((req, res, next)=>{
//     console.log("hi im in a middleware")
// })


//causes error after adding middleware..
// app.get("/",(req, res)=>{
//     res.send("Index page loaded")
// })

app.listen(port, () => {
    connect()
    console.log(`Example app listening on port ${port}!`)
})