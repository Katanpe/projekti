const Room = require('../models/roomModel')
const mongoose = require('mongoose')

// get all rooms
const getRooms = async (req, res) => {
  const user_id = req.user._id

  const rooms = await Room.find({user_id}).sort({createdAt: -1})

  res.status(200).json(rooms)
}

// get a single room
const getRoom = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such room'})
  }

  const room = await Room.findById(id)

  if (!room) {
    return res.status(404).json({error: 'No such room'})
  }
  
  res.status(200).json(room)
}


// create new room
const createRoom = async (req, res) => {
  const {title, load} = req.body

  let emptyFields = []

  if(!title) {
    emptyFields.push('title')
  }
  if(!load) {
    emptyFields.push('load')
  }
  if(emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  // add doc to db
  try {
    const user_id = req.user._id
    const room = await Room.create({title, load, user_id})
    res.status(200).json(room)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// delete a room
const deleteRoom = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such room'})
  }

  const room = await Room.findOneAndDelete({_id: id})

  if (!room) {
    return res.status(400).json({error: 'No such room'})
  }

  res.status(200).json(room)
}

// update a room
const updateRoom = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such room'})
  }

  const room = await Room.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!room) {
    return res.status(400).json({error: 'No such room'})
  }

  res.status(200).json(room)
}


module.exports = {
  getRooms,
  getRoom,
  createRoom,
  deleteRoom,
  updateRoom
}