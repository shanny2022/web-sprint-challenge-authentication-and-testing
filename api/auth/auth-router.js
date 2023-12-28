const jwt = require('jsonwebtoken');
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js'); // replace with your users model

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findBy({ username }); // replace with your find user function

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ message: `Welcome ${user.username}!`, token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});
