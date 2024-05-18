const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const jsonwebtoken = require('jsonwebtoken');
const cors = require('cors');
const User = require('./models/User');

dotenv.config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => console.error('MongoDB connection error:', err));


const jwtSecret = process.env.JWT_SECRET
const app = express();
app.use(express.json())
app.use(cors({
    credentials:true,
    origin: process.env.USER_URL,
}))
app.use(express.json())
app.get('/test',(req,res)=>{
    res.json('ok');
});

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await User.create({
            username,
            password
        });
        jsonwebtoken.sign({ userId: createdUser._id }, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).status(201).json({
                id: createdUser._id,
            });
        });
    } catch (err) {
        if (err.code === 11000 && err.keyValue && err.keyValue.username) {
            // Duplicate key error for username
            return res.status(400).json({ error: 'Username already exists' });
        }
        console.error(err);
        res.status(500).json({ error: 'Error registering user' });
    }
});


app.listen(4040);
