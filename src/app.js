import express from 'express';
import dotenv from 'dotenv';
import { connectToMongoDB, createItem, getItems, getItemById, updateItem, deleteItem } from './server/databaseServ.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectToMongoDB().then(() => {
    console.log('Connected to MongoDB');
    
    app.post('/items', async (req, res) => {
        try {
            const result = await createItem(req.body);
            res.json(result);
        } catch (error) {
            console.error('Error creating item:', error.message);
            res.status(500).json({ error: 'Failed to create item' });
        }
    });

    app.get('/items', async (req, res) => {
        try {
            const items = await getItems();
            res.json(items);
        } catch (error) {
            console.error('Error fetching items:', error.message);
            res.status(500).json({ error: 'Failed to fetch items' });
        }
    });
    
    app.get('/items/:id', async (req, res) => {
        try {
            const item = await getItemById(req.params.id);
            if (!item) {
                res.status(404).json({ error: 'Item not found' });
            } else {
                res.json(item);
            }
        } catch (error) {
            console.error('Error fetching item by ID:', error.message);
            res.status(500).json({ error: 'Failed to fetch item' });
        }
    });
    
    app.put('/items/:id', async (req, res) => {
        try {
            const result = await updateItem(req.params.id, req.body);
            if (result.matchedCount === 0) {
                res.status(404).json({ error: 'Item not found for update' });
            } else {
                res.json(result);
            }
        } catch (error) {
            console.error('Error updating item:', error.message);
            res.status(500).json({ error: 'Failed to update item' });
        }
    });
    
    app.delete('/items/:id', async (req, res) => {
        try {
            const result = await deleteItem(req.params.id);
            if (result.deletedCount === 0) {
                res.status(404).json({ error: 'Item not found for deletion' });
            } else {
                res.json(result);
            }
        } catch (error) {
            console.error('Error deleting item:', error.message);
            res.status(500).json({ error: 'Failed to delete item' });
        }
    });
    
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });

}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
});