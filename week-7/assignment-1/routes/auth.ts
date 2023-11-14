import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import middleware from '../middleware';
import db from '../db';

const {UserModel} = db;

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new UserModel({ username, password });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, middleware.SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ id: user._id }, middleware.SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });

router.get('/me', middleware.authenticateJwt, async (req : any, res) => {
  const user = await UserModel.findOne({ _id: req.userId });
  if (user) {
    res.json({ username: user.username });
  } else {
    res.status(403).json({ message: 'User not logged in' });
  }
});

export default router;
