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


// signup route
router.post("/signup", async (req, res) => {
  const body = req.body;

  if (!(body.email && body.password)) {
    return res.status(400).send({ error: "Data not formatted properly" });
  }
  // creating a new mongoose doc from user data
  const user = new User(body);
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);
  // now we set user password to hashed password
  user.password = await bcrypt.hash(user.password, salt);
  user.save().then((doc) => res.status(201).send(doc));
});

// login route
router.post("/login", async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ email: body.email });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      res.status(200).json({ message: "Valid password" });
    } else {
      res.status(400).json({ error: "Invalid E-mail or password" });
    }
  } else {
    res.status(401).json({ error: "User does not exist" });
  }
});

router.post('/', async (req, res) => {
  const NewUser = new User ({
    id: req.body.id ,
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password
  })
  await NewUser.save()
  return res.send(req.body);
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
