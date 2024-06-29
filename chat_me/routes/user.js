const { upload } = require('../middleware/multer_upload')
const {
  getUserContacts,
  getUserMessages,
  postUserMessage,
  updateMessageReadStatus,
  postRoom
} = require('../controllers/user')
const authenticateToken = require('../middleware/authenticateToken')


const router = require('express').Router()
router.use(authenticateToken)

// READ
router.get('/:userId/contacts', getUserContacts)
// router.get('/:userId/followers', getUserContacts)
// router.get('/:userId/followings', getUserContacts)
// router.get('/:userId/blocked', getUserContacts)
router.get('/:userId/messages', getUserMessages)


// CREATE
router.post('/:userId/message', postUserMessage)
router.post('/CreateRoom', upload.single("avatarImage"), postRoom)

// UPDATE
router.put('/:userId/messages/status', updateMessageReadStatus)

module.exports = router