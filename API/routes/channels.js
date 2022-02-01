const express = require('express');
const router = express.Router();
const Channel = require('../models/Channel');

router.get('/', async (req, res) => {
    const Channels = await Channel.find({})
        return res.send({
            Channels: [...Channels]
        });
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const Channels = await Channel.find({server_id: id})
        return res.send({
            Channels: [...Channels]
        });
});

router.post('/', async (req, res) => {
    const NewChannel = new Channel ({
        id: req.body.id ,
        server_id: req.body.server_id,
        channelName: req.body.channelName,
      })
      await NewChannel.save()
      return res.send(req.body);
})


router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Channel.findOneAndDelete(id)
    return res.send({
        deletedChannel
    });
});

router.put('/:id', async (req, res) =>{
    const id = req.params.id
    const update = req.body
    const updated = await Channel.findOneAndUpdate({ "id": id }, { "$set": { "channelName": update.channelName }})
    return res.send({updated})
})


module.exports = router;
