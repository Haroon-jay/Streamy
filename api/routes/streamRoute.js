const express = require('express')
const StreamCtrl = require('../controllers/Stream')
const router = express.Router()
router.post('/stream', StreamCtrl.createStream)
router.put('/stream/:id', StreamCtrl.editStream)
router.delete('/stream/:id', StreamCtrl.deleteStream)
router.get('/stream/:id', StreamCtrl.getStreamById)
router.get('/stream', StreamCtrl.streamList)

module.exports = router






