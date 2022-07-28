import { response } from 'express';
import Hotel from '../models/Hotel.js';

export const createHotel = async (req, res, next) =>{
    const newHotel = await Hotel(req.body)
    try{
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)
    }catch(err){
        next(err)
    }
}


export const updateHotel = async (req, res, next) =>{
    try{
        const updateHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true} // updated version of the document will be returned
            )
        res.status(200).json(updateHotel);
    }catch(err){
        next(err)
    }
}


export const getHotel = async (req, res, next) =>{
    try{
        const hotelData = await Hotel.findById(req.params.id)
         res.status(200).json(hotelData);
     }catch(err){
        next(err)
     }
}

export const deleteHotel = async (req, res, next) =>{
    try{
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")
    }catch(err){
        next(err)
    }
}

export const getHotels = async (req, res, next) =>{
    // next()  // -> means go to the next middleware

    //customized error function
    //you can check condition and return the custom error function
    // const failed = true;
    // if(failed) return next(createError(401,"you are Authenticated"));

    try{
        const hotelData = await Hotel.find()
        res.status(200).json(hotelData)
     }catch(err){
         // res.status(500).json(err)
          next(err)
     }
}


//gives count by per city 
// response
// [
//     1,
//     2
// ]
export const countByCity = async (req, res, next) =>{
   
    const cities = req.query.cities.split(",")
   
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
     }catch(err){
         // res.status(500).json(err)
          next(err)
     }
}

export const countByType = async (req, res, next) =>{

    const cities = req.query.cities.split(",")
   
    try{
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city})
        }))
        res.status(200).json(list)
     }catch(err){
         // res.status(500).json(err)
          next(err)
     }
}