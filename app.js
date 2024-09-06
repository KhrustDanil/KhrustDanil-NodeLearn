const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

let DB = [];

app.post('/items', (req, res) => {
    const { id, name } = req.body;
    if (!id || !name) return res.status(400).json({ error: 'Invalid data' });

    const newItem = { id, name };
    DB.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => res.json(DB));

app.get('/items/:id', (req, res) => {
    const item = DB.find(entry => entry.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
});

app.put('/items/:id', (req, res) => {
    const { id, name } = req.body;
    const index = DB.findIndex(entry => entry.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: 'Item not found' });
    if (!id || !name) return res.status(400).json({ error: 'Invalid data' });

    DB[index] = { id, name };
    res.json(DB[index]);
});

app.delete('/items/:id', (req, res) => {
    const index = DB.findIndex(entry => entry.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Item not found' });

    DB.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));




