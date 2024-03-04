import express from 'express';
import './loadEnv.mjs';
import todos from './router/todo.mjs'
import users from './router/users.mjs'
import cors from 'cors';
const PORT = process.env.PORT || 8080;

const app = express();
app.use((req, res, next) => {
    req.url = req.url.replace(/\/{2,}/g, '/');
    next();
});
app.use(express.json());
app.use(cors());

app.use('/todos', todos);
app.use('/users', users);

// Global error handling
app.use((err, _req, res, next) => {
    res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});