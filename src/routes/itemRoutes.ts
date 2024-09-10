import { Router, Request, Response } from 'express';
import { getAllItems, getItemById, createItem, updateItem, deleteItem } from '../services/databaseServise';

const router = Router();

// POST (create) new item
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    await createItem(name, description);
    res.status(201).json({ message: 'Item created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// GET all items
router.get('/', async (req: Request, res: Response) => {
  try {
    const items = await getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});

// GET item by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const item = await getItemById(Number(req.params.id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve item' });
  }
});

// PUT (update) item by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;
    await updateItem(Number(req.params.id), name, description);
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// DELETE item by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await deleteItem(Number(req.params.id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

export default router;
