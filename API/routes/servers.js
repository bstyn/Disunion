const express = require('express');
const router = express.Router();
const Server = require('../models/Server');

router.get('/', async (req, res) => {
    const Servers = await Server.find({})
        return res.send({
            Servers: [...Servers]
        });
});

router.post('/join', async (req, res) => {
    const id = req.body.id
    const Servers = await Server.find({"id": id})
    if (!Servers.length){
        return res.status(400).send({ error: "Server does not exist" })
    }else{
        return res.status(200).send({
            Servers: Servers
        })}
});

router.get('/:id', async (req, res) => {
    const id = req.params.id
    const Servers = await Server.find({users: id})
        return res.send({
            Servers: [...Servers]
        });
});

router.post('/', async (req, res) => {
    const NewServer = new Server ({
        id: req.body.id ,
        name: req.body.name, 
        users: req.body.users
      })
      await NewServer.save()
      return res.send(req.body);
})

router.post('/:id', async (req,res) => {
    const id = req.params.id
    const prop = await Server.findOneAndUpdate({"id": id},{$push: {"users": req.body.id}},{safe: true, upsert: true, new : true})
    return res.send({
      Data: prop
    })
  })

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    await Server.findOneAndDelete(id)
    return res.send({
        deletedCompanyId: id
    });
});

router.put('/:id', async (req, res) =>{
    const id = req.params.id
    const update = req.body
    const updated = await Server.findOneAndUpdate({ "id": id }, { "$set": { "name": update.name }})
    return res.send({updated})
})

router.put('/pull/:id', async (req, res) =>{
    const id = req.params.id
    await Server.findOneAndUpdate(id,{$pull: {"users": req.body.id}})
    return res.send({})
})
module.exports = router;