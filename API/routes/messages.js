const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.get('/', async (req, res) => {
    const Messages = await Message.find({})
        return res.send({
            Messages: [...Messages]
        });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const Messages = await Message.find({channel: id})
        return res.send({
            Messages: [...Messages]
        });
});

router.post('/', async (req, res) => {
    const NewMessage = new Message ({
        id: req.body.id,
        channelId: req.body.channelId,
        text: req.body.text,
        username: req.body.username,
        url: req.body.userurl,
        timestamp: req.body.timestamp,
      })
      await NewMessage.save()
      return res.send(req.body);
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Message.findOneAndDelete(id)
    return res.send({
        deletedMessageId:id
    });
});

router.put('/:id', async (req, res) =>{
    const id = req.params.id
    const update = req.body
    const updated = await Message.findOneAndUpdate({ "id": id }, { "$set": { "text": update.text }})
    return res.send({updated})
})

module.exports = router;