import express from 'express';
import database from '../database/connection.mjs';
import jwt from 'jsonwebtoken';
import '../loadEnv.mjs'
import verifyToken from '../middleware/verifyToken.mjs';
const router = express.Router();
const collection = await database.collection('users');


router.get('/', async (req, res) => {
    const users = await collection.find().toArray();
    res.send(users).status(200);
})

router.post('/login', async (req, res) => {
    const {email} = req.body;
    const query = { email };
    const user = await collection.findOne(query);
    if (!user) {
        // If user is not found, send a 404 Not Found status
        return res.status(404).send({ error: 'User not found. Register With Email First' });
    }

    const token = jwt.sign({ userId: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: '12h',
        algorithm: 'HS256'
    });

    res.send({...user,token}).status(200);
})

router.post('/register', async (req, res) => {
    const newUser = req.body;
    const query = { email:newUser.email };

    const user = await collection.findOne(query);
    if (user) {
        // If user is found, send a 403 Found status
        return res.status(403).send({ error: 'User Already Registered' });
    }

    newUser.createdOn = new Date().toLocaleString('en-US', { hour12: true }).toString()
    newUser.modifiedOn = new Date().toLocaleString('en-US', { hour12: true }).toString()
    const result = await collection.insertOne(newUser);
    res.status(200).send(result);
})

router.patch('/update',verifyToken, async (req, res) => {
    const newUser = req.body;
    newUser.modifiedOn = new Date().toLocaleString('en-US', { hour12: true }).toString();
    const updates = { $set: { ...newUser } };
    const query = { email: req.userId };
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
})

export default router;