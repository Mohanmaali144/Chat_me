// routes/messages.js
const express = require('express');
const Message = require('../model/Message.js');

const router = express.Router();

router.post('/messages', async (req, res) => {
  const { room, sender, message } = req.body;
  try {
    const newMessage = new Message({ room, sender, message });
    await newMessage.save();
    res.status(201).send('Message sent');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/messages/:room', async (req, res) => {
  const { room } = req.params;
  try {
    const messages = await Message.find({ room });
    res.send(messages);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
