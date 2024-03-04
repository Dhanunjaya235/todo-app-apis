import express from 'express';

import database from '../database/connection.mjs';
import { ObjectId } from 'mongodb';
import verifyToken from '../middleware/verifyToken.mjs';
const router = express.Router();
router.get('/', async (req, res) => {

    const collection = await database.collection('all-todos');
    const result = await collection.find().toArray();
    res.status(200).send(result)
})

router.get('/user',verifyToken, async (req, res) => {
    const collection = await database.collection('all-todos');
    const email = req.userId
    const query = { email }
    const result = await collection.find(query).toArray();
    res.status(200).send(result);
})

router.get('/:id', async (req, res) => {
    const collection = await database.collection('all-todos');
    const query = { _id: new ObjectId(req.params.id) }
    const result = await collection.find(query).toArray();
    res.status(200).send(result);   
})


router.delete('/:id', async (req, res) => {
    const collection = await database.collection('all-todos');
    const query = { _id: new ObjectId(req.params.id) }
    const result = await collection.deleteOne(query);
    res.status(200).send(result)
})

router.post('/', async (req, res) => {
    const collection = await database.collection('all-todos');
    let newTodo = req.body;
    newTodo.createdOn = new Date().toLocaleString('en-US', { hour12: true }).toString()
    newTodo.modifiedOn = new Date().toLocaleString('en-US', { hour12: true }).toString()
    const result = await collection.insertOne(newTodo);
    res.status(200).send(result);
})

router.patch('/:id', async (req, res) => {
    const collection = await database.collection('all-todos');
    let newTodo = req.body;
    newTodo.modifiedOn = new Date().toLocaleString('en-US', { hour12: true }).toString();
    const query = { _id: new ObjectId(req.params.id) }
    const updates = {
        $set: { ...newTodo }
    };
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
})

export default router;