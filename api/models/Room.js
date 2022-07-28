import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true,
    },
    maxPeople:{
        type: Number,
        required:true,
    },
    desc:{
        type: String,
        required: true
    },
    roomNumbers:[{number:Number, unavailableDates: {type: [Date]}}]

    // {number:101, unavailableDates:[01.02.2022,02.05.2022]}
    // {number:102, unavailableDates:[01.02.2022,02.05.2022]}
    // {number:103, unavailableDates:[01.02.2022,02.05.2022]}

},{timestamps:true});
// timestamps:true -> will give created at and updated at

export default mongoose.model("Room", RoomSchema)