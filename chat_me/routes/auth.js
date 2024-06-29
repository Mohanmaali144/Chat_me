// const upload = require("../middleware/multer_upload.js");
const { upload } = require("../middleware/multer_upload");
const {
  register,
  login,
  refresh,
  logout
} = require('../controllers/auth')
const { check } = require('express-validator')
const User = require('../model/User')

const router = require('express').Router()

router.post('/register', upload.single("avatarImage"), register)

router.post('/login', [
  check('username')
    .isLength({ min: 3, max: 20 })
    .withMessage('Username must be at least 3 chars long'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 chars long')
], login)

router.post('/refresh', refresh)
router.post('/logout', logout)

module.exports = router