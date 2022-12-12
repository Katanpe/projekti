const express = require('express')
const {
  createRoom,
  getRooms,
  getRoom,
  deleteRoom,
  updateRoom
} = require('../controllers/roomController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all room routes
router.use(requireAuth)

// GET all rooms
router.get('/', getRooms)

//GET a single room
router.get('/:id', getRoom)

// POST a new room
router.post('/', createRoom)

// DELETE a room
router.delete('/:id', deleteRoom)

// UPDATE a room
router.patch('/:id', updateRoom)


module.exports = router