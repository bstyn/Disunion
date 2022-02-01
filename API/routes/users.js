const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require('../models/User');

router.get('/', async (req, res) => {
    const mail = req.params.email
    const FoundUser = await User.find({})
        return res.send({
            User: [...FoundUser]
        });
});

router.post("/signup", async (req, res) => {
  const body = req.body;

  if (!(body.email && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  User.find({email : body.email}, async function (err, docs) {
    if (docs.length){
      return res.status(400).send({ error: "Email already exists" });
    }else{
        const user = new User(body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user.save().then(res.status(201).send({message: "Created"})); 
  }})
})

router.post("/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      return res.status(200).json({ message: "Valid password" , nickname: user.nickname, url: user.url, id: user.id});
    } else {
      res.status(400).json({ error: "Invalid E-mail or password" });
    }
  } else {
    res.status(401).json({ error: "Invalid E-mail or password" });
  }
});


router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await User.findOneAndDelete(id)
  return res.send({
    deletedUserId: id
  });
});

router.put('/:id', async (req, res) =>{
  const id = req.params.id
  const update = req.body
  await User.findOneAndUpdate(id,update)
  return res.send({updatedUserId: id})
})

module.exports = router;
