import Hotel from "../models/Hotel.js"
import Room from "../models/Room.js"


export const createRoom = async (req, res, next) => {
    const hotelID = req.params.hotelID
    const  newRoom = new Room(req.body)

    try{
        const savedRoom = await newRoom.save()
        try{
            await Hotel.findByIdAndUpdate(hotelID,{$push: {rooms: savedRoom._id}})
        }catch(err){
            next(err)
        }
        res.status(200).json(savedRoom)
    }catch(err){
        next(err)
    }
}

export const updateRoom = async (req, res, next) =>{
    try{
        const updateRoom = await Room.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new:true} // updated version of the document will be returned
            )
        res.status(200).json(updateRoom);
    }catch(err){
        next(err)
    }
}


export const getRoom = async (req, res, next) =>{
    try{
        const RoomData = await Room.findById(req.params.id)
         res.status(200).json(RoomData);
     }catch(err){
        next(err)
     }
}

export const deleteRoom = async (req, res, next) =>{
    try{
        await Room.findByIdAndDelete(req.params.id)
        res.status(200).json("Room has been deleted.")
    }catch(err){
        next(err)
    }
}

export const getRooms = async (req, res, next) =>{
    // next()  // -> means go to the next middleware

    //customized error function
    //you can check condition and return the custom error function
    // const failed = true;
    // if(failed) return next(createError(401,"you are Authenticated"));

    try{
        const RoomData = await Room.find()
        res.status(200).json(RoomData)
     }catch(err){
         // res.status(500).json(err)
          next(err)
     }
}