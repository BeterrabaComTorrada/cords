const express = require('express');
const cors = require('cors');
const Message = require('./models/message');
require('./database');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/messages', async (req, res) => {
    try {
        const { text, latitude, longitude } = req.body;
        const newMessage = new Message({ text, latitude, longitude });
        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/api/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { text, latitude, longitude } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(id, { text, latitude, longitude }, { new: true });
        res.json(updatedMessage);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/messages/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Message.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
